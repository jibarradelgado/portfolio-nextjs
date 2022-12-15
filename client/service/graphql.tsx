import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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

export type GetAllAssetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAssetsQuery = { __typename?: 'Query', assets: Array<{ __typename?: 'Asset', id: string, name: string, value: number, userId: number, assetTypeId: number } | null> };


export const GetAllAssetsDocument = gql`
    query getAllAssets {
  assets {
    id
    name
    value
    userId
    assetTypeId
  }
}
    `;

/**
 * __useGetAllAssetsQuery__
 *
 * To run a query within a React component, call `useGetAllAssetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAssetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAssetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllAssetsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllAssetsQuery, GetAllAssetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllAssetsQuery, GetAllAssetsQueryVariables>(GetAllAssetsDocument, options);
      }
export function useGetAllAssetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllAssetsQuery, GetAllAssetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllAssetsQuery, GetAllAssetsQueryVariables>(GetAllAssetsDocument, options);
        }
export type GetAllAssetsQueryHookResult = ReturnType<typeof useGetAllAssetsQuery>;
export type GetAllAssetsLazyQueryHookResult = ReturnType<typeof useGetAllAssetsLazyQuery>;
export type GetAllAssetsQueryResult = Apollo.QueryResult<GetAllAssetsQuery, GetAllAssetsQueryVariables>;