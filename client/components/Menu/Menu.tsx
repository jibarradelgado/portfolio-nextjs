import React, { useState } from 'react'
import { Menu as MenuSemantic, Button, Icon } from 'semantic-ui-react'
import { AssetForm } from '@components/AssetForm/AssetForm'
import { AssetTypeForm } from '@components/AssetTypeForm/AssetTypeForm'
import { CryptoForm } from '@components/CryptoForm/CryptoForm'

const Menu = () => {
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
      <MenuSemantic size='large' borderless widths={3}>
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
      <AssetForm visible={visibleAssetForm} setVisible={setVisibleAssetForm} />
      <AssetTypeForm visible={visibleAssetTypeForm} setVisible={setVisibleAssetTypeForm}/>
      <CryptoForm visible={visibleCryptoForm} setVisible={setVisibleCryptoForm}/>
    </>
  )
}

export default Menu