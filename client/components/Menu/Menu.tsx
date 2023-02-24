import React, { useEffect, useState } from 'react'
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
  const [width, setWidth] = useState({width: window.innerWidth})

  useEffect(() => {
    function handleResize() {
      setWidth({width: window.innerWidth})
    }
    window.addEventListener('resize', handleResize)

    return () => { window.removeEventListener('resize', handleResize)}
  })



  const isVertical = () => {
    let width = window.innerWidth
    if (width > 630) return false
    else return true
  }

  const toggleVisibility = ({ target }: React.MouseEvent) => {
    if ((target as HTMLButtonElement).id) {
      const buttonId = (target as HTMLButtonElement).id
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
      <MenuSemantic size='large' fluid borderless widths={width.width < 650 ? 1 : 3} vertical={width.width < 650 ? true : false}>
        <MenuSemantic.Item id='assetButton' name='Add Asset' labelPosition='left' onClick={toggleVisibility}  />
        <MenuSemantic.Item id='assetTypeButton' name='Add Asset Type' onClick={toggleVisibility} />
        <MenuSemantic.Item id="cryptoButton" name='Add Crypto' onClick={toggleVisibility} />
      </MenuSemantic>
      <AssetForm visible={visibleAssetForm} setVisible={setVisibleAssetForm} assetTypes={assetTypes} setAssetsChanged={setAssetsChanged}/>
      <AssetTypeForm visible={visibleAssetTypeForm} setVisible={setVisibleAssetTypeForm} assetTypes={assetTypes} setAssetTypesChanged={setAssetTypesChanged}/>
      <CryptoSection visible={visibleCryptoForm} setVisible={setVisibleCryptoForm} assetTypes={assetTypes} setAssetsChanged={setAssetsChanged}/>
    </>
  )
}

export default Menu