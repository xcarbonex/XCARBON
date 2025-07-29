import React from "react";
import {Chip} from "@heroui/react";
const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-green-100 text-green-800",
  FAILED: "bg-red-100 text-red-800",
};

const statusLabels = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  FAILED: "Failed",
};

function MintedAssetsProgress({mintedAssets = []}) {
  if (mintedAssets.length === 0) {
    return (
      <div className="flex flex-col border rounded-md items-center justify-center py-12 text-center">
        <div className="text-4xl mb-4">⏳</div>
        <h3 className="text-lg font-semibold">No Minted Assets Yet</h3>
        <p className="text-sm text-gray-500 max-w-md">
          You don’t have any minted carbon credit assets at the moment. Once you
          mint asset, they’ll appear here with live progress updates.
        </p>
      </div>
    );
  }
  return (
    <div className="grid gap-4">
      {mintedAssets.map((asset, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 shadow-sm bg-secondary text-tbase hover:shadow transition"
        >
          <div className="flex justify-between mb-2">
            <h3 className=" font-semibold">
              {asset.projectName} ({asset.vintageYear})
            </h3>
            <Chip
              size="sm"
              variant="flat"
              className={`text-xs px-2 py-0.5 rounded shadow ${
                statusColors[asset.status] || 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {statusLabels[asset.status] || "Pending"}
            </Chip>
          </div>

          <p className="text-sm text-tbase mb-3">
            {asset.location} • Qty: {asset.quantity} • Token:{" "}
            {asset.tokenSymbol}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-tbase mt-2">
            {/* <p>
              <strong>Blockchain:</strong> {asset.blockchain}
            </p> */}
            {/* <p>
              <strong>Wallet:</strong>{" "}
              <span className="text-xs">{asset.walletAddress}</span>
            </p> */}
           {asset.transactionHash && <p>
              <strong>Tx Hash:</strong>{" "}
              <span className="text-xs">{asset.transactionHash}</span>
            </p>}
            {/* {asset.blockNumber && (
              <p>
                <strong>Block #:</strong> {asset.blockNumber}
              </p>
            )} */}
            {asset.mintedAt && (
              <p>
                <strong>Minted At:</strong>{" "}
                {new Date(asset.mintedAt).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MintedAssetsProgress;
