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
  data: AssetTypeCreateInput;
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

export type AddAssetMutationVariables = Exact<{
  data: AssetCreateInput;
}>;


export type AddAssetMutation = { __typename?: 'Mutation', createAsset: { __typename?: 'Asset', id: string, name: string, value: number, userId: number, assetTypeId: number, user: { __typename?: 'User', username?: string | null }, type: { __typename?: 'AssetType', name: string, targetPercentage: number } } };

export type DeleteAssetMutationVariables = Exact<{
  where: AssetWhereInput;
}>;


export type DeleteAssetMutation = { __typename?: 'Mutation', deleteAsset?: { __typename?: 'Asset', id: string, name: string, value: number, userId: number, assetTypeId: number, user: { __typename?: 'User', username?: string | null }, type: { __typename?: 'AssetType', name: string, targetPercentage: number } } | null };

export type UpdateAssetMutationVariables = Exact<{
  where: AssetWhereInput;
  data: AssetCreateInput;
}>;


export type UpdateAssetMutation = { __typename?: 'Mutation', updateAsset: { __typename?: 'Asset', id: string, name: string, value: number, userId: number, assetTypeId: number, user: { __typename?: 'User', username?: string | null }, type: { __typename?: 'AssetType', name: string, targetPercentage: number } } };

export type AddAssetTypeMutationVariables = Exact<{
  data: AssetTypeCreateInput;
}>;


export type AddAssetTypeMutation = { __typename?: 'Mutation', createAssetType: { __typename?: 'AssetType', id: string, name: string, targetPercentage: number, userId: number, user: { __typename?: 'User', username?: string | null } } };

export type DeleteAssetTypeMutationVariables = Exact<{
  where: AssetTypeWhereInput;
}>;


export type DeleteAssetTypeMutation = { __typename?: 'Mutation', deleteAssetType?: { __typename?: 'AssetType', id: string, name: string, targetPercentage: number, userId: number, user: { __typename?: 'User', username?: string | null } } | null };

export type UpdateAssetTypeMutationVariables = Exact<{
  where: AssetTypeWhereInput;
  data: AssetTypeCreateInput;
}>;


export type UpdateAssetTypeMutation = { __typename?: 'Mutation', updateAssetType: { __typename?: 'AssetType', id: string, name: string, targetPercentage: number, userId: number, user: { __typename?: 'User', username?: string | null } } };

export const AssetFragmentDoc = gql`
    fragment Asset on Asset {
  id
  name
  value
  userId
  assetTypeId
  user {
    username
  }
  type {
    name
    targetPercentage
  }
}
    `;
export const AssetTypeFragmentDoc = gql`
    fragment AssetType on AssetType {
  id
  name
  targetPercentage
  userId
  user {
    username
  }
}
    `;
export const GetAllAssetsDocument = gql`
    query getAllAssets {
  assets {
    ...Asset
  }
}
    ${AssetFragmentDoc}`;

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
export const GetAllAssetsFromUserDocument = gql`
    query getAllAssetsFromUser($where: AssetWhereInput) {
  assets(where: $where) {
    ...Asset
  }
}
    ${AssetFragmentDoc}`;

/**
 * __useGetAllAssetsFromUserQuery__
 *
 * To run a query within a React component, call `useGetAllAssetsFromUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAssetsFromUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAssetsFromUserQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetAllAssetsFromUserQuery(baseOptions?: Apollo.QueryHookOptions<GetAllAssetsFromUserQuery, GetAllAssetsFromUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllAssetsFromUserQuery, GetAllAssetsFromUserQueryVariables>(GetAllAssetsFromUserDocument, options);
      }
export function useGetAllAssetsFromUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllAssetsFromUserQuery, GetAllAssetsFromUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllAssetsFromUserQuery, GetAllAssetsFromUserQueryVariables>(GetAllAssetsFromUserDocument, options);
        }
export type GetAllAssetsFromUserQueryHookResult = ReturnType<typeof useGetAllAssetsFromUserQuery>;
export type GetAllAssetsFromUserLazyQueryHookResult = ReturnType<typeof useGetAllAssetsFromUserLazyQuery>;
export type GetAllAssetsFromUserQueryResult = Apollo.QueryResult<GetAllAssetsFromUserQuery, GetAllAssetsFromUserQueryVariables>;
export const GetAllAssetTypesFromUserDocument = gql`
    query getAllAssetTypesFromUser($where: AssetTypeWhereInput) {
  assetTypes(where: $where) {
    ...AssetType
  }
}
    ${AssetTypeFragmentDoc}`;

/**
 * __useGetAllAssetTypesFromUserQuery__
 *
 * To run a query within a React component, call `useGetAllAssetTypesFromUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAssetTypesFromUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAssetTypesFromUserQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetAllAssetTypesFromUserQuery(baseOptions?: Apollo.QueryHookOptions<GetAllAssetTypesFromUserQuery, GetAllAssetTypesFromUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllAssetTypesFromUserQuery, GetAllAssetTypesFromUserQueryVariables>(GetAllAssetTypesFromUserDocument, options);
      }
export function useGetAllAssetTypesFromUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllAssetTypesFromUserQuery, GetAllAssetTypesFromUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllAssetTypesFromUserQuery, GetAllAssetTypesFromUserQueryVariables>(GetAllAssetTypesFromUserDocument, options);
        }
export type GetAllAssetTypesFromUserQueryHookResult = ReturnType<typeof useGetAllAssetTypesFromUserQuery>;
export type GetAllAssetTypesFromUserLazyQueryHookResult = ReturnType<typeof useGetAllAssetTypesFromUserLazyQuery>;
export type GetAllAssetTypesFromUserQueryResult = Apollo.QueryResult<GetAllAssetTypesFromUserQuery, GetAllAssetTypesFromUserQueryVariables>;
export const AddAssetDocument = gql`
    mutation addAsset($data: AssetCreateInput!) {
  createAsset(data: $data) {
    ...Asset
  }
}
    ${AssetFragmentDoc}`;
export type AddAssetMutationFn = Apollo.MutationFunction<AddAssetMutation, AddAssetMutationVariables>;

/**
 * __useAddAssetMutation__
 *
 * To run a mutation, you first call `useAddAssetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAssetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAssetMutation, { data, loading, error }] = useAddAssetMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddAssetMutation(baseOptions?: Apollo.MutationHookOptions<AddAssetMutation, AddAssetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAssetMutation, AddAssetMutationVariables>(AddAssetDocument, options);
      }
export type AddAssetMutationHookResult = ReturnType<typeof useAddAssetMutation>;
export type AddAssetMutationResult = Apollo.MutationResult<AddAssetMutation>;
export type AddAssetMutationOptions = Apollo.BaseMutationOptions<AddAssetMutation, AddAssetMutationVariables>;
export const DeleteAssetDocument = gql`
    mutation deleteAsset($where: AssetWhereInput!) {
  deleteAsset(where: $where) {
    ...Asset
  }
}
    ${AssetFragmentDoc}`;
export type DeleteAssetMutationFn = Apollo.MutationFunction<DeleteAssetMutation, DeleteAssetMutationVariables>;

/**
 * __useDeleteAssetMutation__
 *
 * To run a mutation, you first call `useDeleteAssetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAssetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAssetMutation, { data, loading, error }] = useDeleteAssetMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteAssetMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAssetMutation, DeleteAssetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAssetMutation, DeleteAssetMutationVariables>(DeleteAssetDocument, options);
      }
export type DeleteAssetMutationHookResult = ReturnType<typeof useDeleteAssetMutation>;
export type DeleteAssetMutationResult = Apollo.MutationResult<DeleteAssetMutation>;
export type DeleteAssetMutationOptions = Apollo.BaseMutationOptions<DeleteAssetMutation, DeleteAssetMutationVariables>;
export const UpdateAssetDocument = gql`
    mutation updateAsset($where: AssetWhereInput!, $data: AssetCreateInput!) {
  updateAsset(where: $where, data: $data) {
    ...Asset
  }
}
    ${AssetFragmentDoc}`;
export type UpdateAssetMutationFn = Apollo.MutationFunction<UpdateAssetMutation, UpdateAssetMutationVariables>;

/**
 * __useUpdateAssetMutation__
 *
 * To run a mutation, you first call `useUpdateAssetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAssetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAssetMutation, { data, loading, error }] = useUpdateAssetMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateAssetMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAssetMutation, UpdateAssetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAssetMutation, UpdateAssetMutationVariables>(UpdateAssetDocument, options);
      }
export type UpdateAssetMutationHookResult = ReturnType<typeof useUpdateAssetMutation>;
export type UpdateAssetMutationResult = Apollo.MutationResult<UpdateAssetMutation>;
export type UpdateAssetMutationOptions = Apollo.BaseMutationOptions<UpdateAssetMutation, UpdateAssetMutationVariables>;
export const AddAssetTypeDocument = gql`
    mutation addAssetType($data: AssetTypeCreateInput!) {
  createAssetType(data: $data) {
    ...AssetType
  }
}
    ${AssetTypeFragmentDoc}`;
export type AddAssetTypeMutationFn = Apollo.MutationFunction<AddAssetTypeMutation, AddAssetTypeMutationVariables>;

/**
 * __useAddAssetTypeMutation__
 *
 * To run a mutation, you first call `useAddAssetTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAssetTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAssetTypeMutation, { data, loading, error }] = useAddAssetTypeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddAssetTypeMutation(baseOptions?: Apollo.MutationHookOptions<AddAssetTypeMutation, AddAssetTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAssetTypeMutation, AddAssetTypeMutationVariables>(AddAssetTypeDocument, options);
      }
export type AddAssetTypeMutationHookResult = ReturnType<typeof useAddAssetTypeMutation>;
export type AddAssetTypeMutationResult = Apollo.MutationResult<AddAssetTypeMutation>;
export type AddAssetTypeMutationOptions = Apollo.BaseMutationOptions<AddAssetTypeMutation, AddAssetTypeMutationVariables>;
export const DeleteAssetTypeDocument = gql`
    mutation deleteAssetType($where: AssetTypeWhereInput!) {
  deleteAssetType(where: $where) {
    ...AssetType
  }
}
    ${AssetTypeFragmentDoc}`;
export type DeleteAssetTypeMutationFn = Apollo.MutationFunction<DeleteAssetTypeMutation, DeleteAssetTypeMutationVariables>;

/**
 * __useDeleteAssetTypeMutation__
 *
 * To run a mutation, you first call `useDeleteAssetTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAssetTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAssetTypeMutation, { data, loading, error }] = useDeleteAssetTypeMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteAssetTypeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAssetTypeMutation, DeleteAssetTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAssetTypeMutation, DeleteAssetTypeMutationVariables>(DeleteAssetTypeDocument, options);
      }
export type DeleteAssetTypeMutationHookResult = ReturnType<typeof useDeleteAssetTypeMutation>;
export type DeleteAssetTypeMutationResult = Apollo.MutationResult<DeleteAssetTypeMutation>;
export type DeleteAssetTypeMutationOptions = Apollo.BaseMutationOptions<DeleteAssetTypeMutation, DeleteAssetTypeMutationVariables>;
export const UpdateAssetTypeDocument = gql`
    mutation updateAssetType($where: AssetTypeWhereInput!, $data: AssetTypeCreateInput!) {
  updateAssetType(where: $where, data: $data) {
    ...AssetType
  }
}
    ${AssetTypeFragmentDoc}`;
export type UpdateAssetTypeMutationFn = Apollo.MutationFunction<UpdateAssetTypeMutation, UpdateAssetTypeMutationVariables>;

/**
 * __useUpdateAssetTypeMutation__
 *
 * To run a mutation, you first call `useUpdateAssetTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAssetTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAssetTypeMutation, { data, loading, error }] = useUpdateAssetTypeMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateAssetTypeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAssetTypeMutation, UpdateAssetTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAssetTypeMutation, UpdateAssetTypeMutationVariables>(UpdateAssetTypeDocument, options);
      }
export type UpdateAssetTypeMutationHookResult = ReturnType<typeof useUpdateAssetTypeMutation>;
export type UpdateAssetTypeMutationResult = Apollo.MutationResult<UpdateAssetTypeMutation>;
export type UpdateAssetTypeMutationOptions = Apollo.BaseMutationOptions<UpdateAssetTypeMutation, UpdateAssetTypeMutationVariables>;