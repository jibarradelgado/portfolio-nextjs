import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Asset = BaseModel & {
  __typename?: 'Asset';
  assetTypeId: Scalars['Int'];
  attribute?: Maybe<Attribute>;
  attributeId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  quantity?: Maybe<Scalars['Float']>;
  type: AssetType;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: User;
  userId: Scalars['Int'];
  value: Scalars['Float'];
};

export type AssetCreateInput = {
  assetTypeId: Scalars['Int'];
  attributeId?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  quantity?: InputMaybe<Scalars['Float']>;
  userId?: InputMaybe<Scalars['Int']>;
  value: Scalars['Float'];
};

export type AssetType = BaseModel & {
  __typename?: 'AssetType';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  targetPercentage: Scalars['Float'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: User;
  userId: Scalars['Int'];
};

export type AssetTypeCreateInput = {
  name: Scalars['String'];
  targetPercentage: Scalars['Float'];
  userId?: InputMaybe<Scalars['Int']>;
};

export type AssetTypeWhereInput = {
  id?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['Int']>;
};

export type AssetWhereInput = {
  id?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['Int']>;
};

export type Attribute = {
  __typename?: 'Attribute';
  id: Scalars['ID'];
  lastValue?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type AttributeCreateInput = {
  lastValue: Scalars['Float'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  type: Scalars['String'];
};

export type AttributeWhereInput = {
  id: Scalars['ID'];
};

export type BaseModel = {
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAsset: Asset;
  createAssetType: AssetType;
  createAttribute: Attribute;
  deleteAsset?: Maybe<Asset>;
  deleteAssetType?: Maybe<AssetType>;
  deleteAttribute?: Maybe<Attribute>;
  updateAsset: Asset;
  updateAssetType: AssetType;
  updateAttribute: Attribute;
};


export type MutationCreateAssetArgs = {
  data: AssetCreateInput;
};


export type MutationCreateAssetTypeArgs = {
  data: AssetCreateInput;
};


export type MutationCreateAttributeArgs = {
  data: AttributeCreateInput;
};


export type MutationDeleteAssetArgs = {
  where: AssetWhereInput;
};


export type MutationDeleteAssetTypeArgs = {
  where: AssetTypeWhereInput;
};


export type MutationDeleteAttributeArgs = {
  where: AttributeWhereInput;
};


export type MutationUpdateAssetArgs = {
  data: AssetCreateInput;
  where: AssetWhereInput;
};


export type MutationUpdateAssetTypeArgs = {
  data: AssetTypeCreateInput;
  where: AssetTypeWhereInput;
};


export type MutationUpdateAttributeArgs = {
  data: AttributeCreateInput;
  where: AttributeWhereInput;
};

export type Query = {
  __typename?: 'Query';
  assetTypes: Array<Maybe<AssetType>>;
  assets: Array<Maybe<Asset>>;
  attributes: Array<Maybe<Attribute>>;
};


export type QueryAssetTypesArgs = {
  where?: InputMaybe<AssetTypeWhereInput>;
};


export type QueryAssetsArgs = {
  where?: InputMaybe<AssetWhereInput>;
};


export type QueryAttributesArgs = {
  where?: InputMaybe<AttributeWhereInput>;
};

export type User = BaseModel & {
  __typename?: 'User';
  admin?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  password?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username?: Maybe<Scalars['String']>;
};

export type AssetFragment = { __typename?: 'Asset', id: string, name: string, value: number, userId: number, assetTypeId: number, user: { __typename?: 'User', username?: string | null }, type: { __typename?: 'AssetType', name: string, targetPercentage: number } };

export type AssetTypeFragment = { __typename?: 'AssetType', id: string, name: string, targetPercentage: number, userId: number, user: { __typename?: 'User', username?: string | null } };

export type GetAllAssetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAssetsQuery = { __typename?: 'Query', assets: Array<{ __typename?: 'Asset', id: string, name: string, value: number, userId: number, assetTypeId: number, user: { __typename?: 'User', username?: string | null }, type: { __typename?: 'AssetType', name: string, targetPercentage: number } } | null> };

export type GetAllAssetsFromUserQueryVariables = Exact<{
  where?: InputMaybe<AssetWhereInput>;
}>;


export type GetAllAssetsFromUserQuery = { __typename?: 'Query', assets: Array<{ __typename?: 'Asset', id: string, name: string, value: number, userId: number, assetTypeId: number, user: { __typename?: 'User', username?: string | null }, type: { __typename?: 'AssetType', name: string, targetPercentage: number } } | null> };

export type GetAllAssetTypesFromUserQueryVariables = Exact<{
  where?: InputMaybe<AssetTypeWhereInput>;
}>;


export type GetAllAssetTypesFromUserQuery = { __typename?: 'Query', assetTypes: Array<{ __typename?: 'AssetType', id: string, name: string, targetPercentage: number, userId: number, user: { __typename?: 'User', username?: string | null } } | null> };

export const AssetFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Asset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"assetTypeId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"targetPercentage"}}]}}]}}]} as unknown as DocumentNode<AssetFragment, unknown>;
export const AssetTypeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetType"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AssetType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"targetPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<AssetTypeFragment, unknown>;
export const GetAllAssetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllAssets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Asset"}}]}}]}},...AssetFragmentDoc.definitions]} as unknown as DocumentNode<GetAllAssetsQuery, GetAllAssetsQueryVariables>;
export const GetAllAssetsFromUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllAssetsFromUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AssetWhereInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Asset"}}]}}]}},...AssetFragmentDoc.definitions]} as unknown as DocumentNode<GetAllAssetsFromUserQuery, GetAllAssetsFromUserQueryVariables>;
export const GetAllAssetTypesFromUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllAssetTypesFromUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AssetTypeWhereInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assetTypes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetType"}}]}}]}},...AssetTypeFragmentDoc.definitions]} as unknown as DocumentNode<GetAllAssetTypesFromUserQuery, GetAllAssetTypesFromUserQueryVariables>;