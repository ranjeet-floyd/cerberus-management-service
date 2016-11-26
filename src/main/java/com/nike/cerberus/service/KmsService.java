/*
 * Copyright (c) 2016 Nike, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.nike.cerberus.service;

import com.amazonaws.services.kms.AWSKMSClient;
import com.amazonaws.services.kms.model.CreateAliasRequest;
import com.amazonaws.services.kms.model.CreateKeyRequest;
import com.amazonaws.services.kms.model.CreateKeyResult;
import com.amazonaws.services.kms.model.KeyUsageType;
import com.nike.cerberus.aws.KmsClientFactory;
import com.nike.cerberus.dao.AwsIamRoleDao;
import com.nike.cerberus.record.AwsIamRoleKmsKeyRecord;
import com.nike.cerberus.util.UuidSupplier;
import org.mybatis.guice.transactional.Transactional;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.time.OffsetDateTime;

/**
 * Abstracts interactions with the AWS KMS service.
 */
@Singleton
public class KmsService {

    private static final String KMS_ALIAS_FORMAT = "alias/cerberus/%s";

    private final AwsIamRoleDao awsIamRoleDao;

    private final UuidSupplier uuidSupplier;

    private final KmsClientFactory kmsClientFactory;

    private final KmsPolicyService kmsPolicyService;

    @Inject
    public KmsService(final AwsIamRoleDao awsIamRoleDao,
                      final UuidSupplier uuidSupplier,
                      final KmsClientFactory kmsClientFactory,
                      final KmsPolicyService kmsPolicyService) {
        this.awsIamRoleDao = awsIamRoleDao;
        this.uuidSupplier = uuidSupplier;
        this.kmsClientFactory = kmsClientFactory;
        this.kmsPolicyService = kmsPolicyService;
    }

    /**
     * Provisions a new KMS CMK in the specified region to be used by the specified role.
     *
     * @param iamRoleId        The IAM role that this CMK will be associated with
     * @param iamRoleAccountId The AWS account ID for the IAM role
     * @param iamRoleName      The AWS IAM role name for the IAM role
     * @param awsRegion        The region to provision the key in
     * @param user             The user requesting it
     * @param dateTime         The date of creation
     * @return The AWS Key ID ARN
     */
    @Transactional
    public String provisionKmsKey(final String iamRoleId,
                                  final String iamRoleAccountId,
                                  final String iamRoleName,
                                  final String awsRegion,
                                  final String user,
                                  final OffsetDateTime dateTime) {
        final AWSKMSClient kmsClient = kmsClientFactory.getClient(awsRegion);

        final String awsIamRoleKmsKeyId = uuidSupplier.get();

        final CreateKeyRequest request = new CreateKeyRequest();
        request.setKeyUsage(KeyUsageType.ENCRYPT_DECRYPT);
        request.setDescription("Key used by Cerberus for IAM role authentication.");
        request.setPolicy(kmsPolicyService.generateStandardKmsPolicy(iamRoleAccountId, iamRoleName));
        final CreateKeyResult result = kmsClient.createKey(request);

        final CreateAliasRequest aliasRequest = new CreateAliasRequest();
        aliasRequest.setAliasName(String.format(KMS_ALIAS_FORMAT, awsIamRoleKmsKeyId));
        aliasRequest.setTargetKeyId(result.getKeyMetadata().getArn());
        kmsClient.createAlias(aliasRequest);

        final AwsIamRoleKmsKeyRecord awsIamRoleKmsKeyRecord = new AwsIamRoleKmsKeyRecord();
        awsIamRoleKmsKeyRecord.setId(awsIamRoleKmsKeyId);
        awsIamRoleKmsKeyRecord.setAwsIamRoleId(iamRoleId);
        awsIamRoleKmsKeyRecord.setAwsKmsKeyId(result.getKeyMetadata().getArn());
        awsIamRoleKmsKeyRecord.setAwsRegion(awsRegion);
        awsIamRoleKmsKeyRecord.setCreatedBy(user);
        awsIamRoleKmsKeyRecord.setLastUpdatedBy(user);
        awsIamRoleKmsKeyRecord.setCreatedTs(dateTime);
        awsIamRoleKmsKeyRecord.setLastUpdatedTs(dateTime);

        awsIamRoleDao.createIamRoleKmsKey(awsIamRoleKmsKeyRecord);

        return result.getKeyMetadata().getArn();
    }
}