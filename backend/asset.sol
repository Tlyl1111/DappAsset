// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AssetManager {
    struct Asset {
        string name;
        uint256 purchaseDate;
        uint256 value;
        string description;
        string imageURL; 
        string note;
    }

    Asset[] public assets;

    mapping(address => uint256[]) public userAssets;

    function addAsset(
        string memory _name,
        uint256 _purchaseDate,
        uint256 _value,
        string memory _description,
        string memory _imageURL,
        string memory _note
    ) public {
        Asset memory newAsset = Asset({
            name: _name,
            purchaseDate: _purchaseDate,
            value: _value,
            description: _description,
            imageURL: _imageURL,
            note: _note
        });
        assets.push(newAsset);
        uint256 assetId = assets.length - 1;
        userAssets[msg.sender].push(assetId);
    }

    function editAsset(
        uint256 _assetId,
        string memory _name,
        uint256 _purchaseDate,
        uint256 _value,
        string memory _description,
        string memory _imageURL,
        string memory _note
    ) public {
        require(_assetId < assets.length, "Asset does not exist");
        Asset storage asset = assets[_assetId];
        asset.name = _name;
        asset.purchaseDate = _purchaseDate;
        asset.value = _value;
        asset.description = _description;
        asset.imageURL = _imageURL;
        asset.note = _note;
    }

    function deleteAsset(uint256 _assetId) public {
        require(_assetId < assets.length, "Asset does not exist");
        require(isOwner(_assetId), "You are not the owner of this asset");
        
        assets[_assetId] = assets[assets.length - 1];
        assets.pop();
        
        removeAssetFromUserList(_assetId);
    }

    function isOwner(uint256 _assetId) internal view returns (bool) {
        uint256[] memory userAssetList = userAssets[msg.sender];
        for (uint256 i = 0; i < userAssetList.length; i++) {
            if (userAssetList[i] == _assetId) {
                return true;
            }
        }
        return false;
    }

    function removeAssetFromUserList(uint256 _assetId) internal {
        uint256[] storage userAssetList = userAssets[msg.sender];
        for (uint256 i = 0; i < userAssetList.length; i++) {
            if (userAssetList[i] == _assetId) {
                userAssetList[i] = userAssetList[userAssetList.length - 1];
                userAssetList.pop();
                break;
            }
        }
    }

    function getAssetDetails(uint256 _assetId) public view returns (Asset memory) {
        require(_assetId < assets.length, "Asset does not exist");
        return assets[_assetId];
    }

    function getUserAssets() public view returns (Asset[] memory) {
        uint256[] memory userAssetList = userAssets[msg.sender];
        Asset[] memory userAssetsList = new Asset[](userAssetList.length);
        for (uint256 i = 0; i < userAssetList.length; i++) {
            userAssetsList[i] = assets[userAssetList[i]];
        }
        return userAssetsList;
    }
}