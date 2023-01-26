import React, { useState } from 'react'
import { Menu as MenuSemantic, Button, Icon } from 'semantic-ui-react'
import { AssetForm } from '@components/AssetForm/AssetForm'
import { AssetTypeForm } from '@components/AssetTypeForm/AssetTypeForm'
import { CryptoSection } from '@components/CryptoForm/CryptoSection'
import { AssetFragment, AssetTypeFragment } from 'service/graphql'

type MenuProps = {
  assetTypes: AssetTypeFragment[]
  setAssetsChanged: React.Dispatch<React.SetStateAction<boolean>>
  setAssetTypesChanged: React.Dispatch<React.SetStateAction<boolean>>
}

const Menu = ({assetTypes, setAssetsChanged, setAssetTypesChanged}: MenuProps) => {
  const [visibleAssetForm, setVisibleAssetForm] = useState(false)
  const [visibleAssetTypeForm, setVisibleAssetTypeForm] = useState(false)
  const [visibleCryptoForm, setVisibleCryptoForm] = useState(false)

  const toggleVisibility = ({ target }: React.MouseEvent) => {
    if ((target as HTMLButtonElement).id) {
      const buttonId = (target as HTMLButtonElement).id
      console.log(buttonId)
      switch (buttonId) {
        case "assetButton": {
          setVisibleAssetForm((prevVisible) => !prevVisible)
          setVisibleAssetTypeForm(false)
          setVisibleCryptoForm(false)
          break
        }
        case "assetTypeButton": {
          setVisibleAssetTypeForm((prevVisible) => !prevVisible)
          setVisibleAssetForm(false)
          setVisibleCryptoForm(false)
          break
        }
        case "cryptoButton": {
          setVisibleCryptoForm((prevVisible) => !prevVisible)
          setVisibleAssetForm(false)
          setVisibleAssetTypeForm(false)
          break
        }
      }
    }
  }

  return (
    <>
      <MenuSemantic size='large' borderless widths={2}>
        <MenuSemantic.Item>
          <Button id="assetButton" onClick={toggleVisibility} icon labelPosition='left'>
            <Icon name="add" />
            Add Asset
          </Button>
        </MenuSemantic.Item>
        <MenuSemantic.Item>
          <Button id="assetTypeButton" onClick={toggleVisibility} icon labelPosition='left'>
            <Icon name="add" />
            Add Asset Type
          </Button>
        </MenuSemantic.Item>
        <MenuSemantic.Item>
          <Button id="cryptoButton" onClick={toggleVisibility} icon labelPosition='left'>
            <Icon name="add" />
            Add Crypto
          </Button>
        </MenuSemantic.Item>
      </MenuSemantic>
      <AssetForm visible={visibleAssetForm} setVisible={setVisibleAssetForm} assetTypes={assetTypes} setAssetsChanged={setAssetsChanged}/>
      <AssetTypeForm visible={visibleAssetTypeForm} setVisible={setVisibleAssetTypeForm} assetTypes={assetTypes} setAssetTypesChanged={setAssetTypesChanged}/>
      <CryptoSection visible={visibleCryptoForm} setVisible={setVisibleCryptoForm} assetTypes={assetTypes} setAssetsChanged={setAssetsChanged}/>
    </>
  )
}

export default Menu