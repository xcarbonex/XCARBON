import React from "react";
import {Tabs, Tab, Card, CardHeader, CardBody} from "@heroui/react";
import MintedAssetsProgress from "./MintedAssetsProgress";
import SavedAsDraftAssets from "./SavedAsDraftAssets";
import useStore from "@/store/store";
import {Button} from "@/components";

function AssetsProgress() {
  const {draft, mintedAssets} = useStore();
  return (
    <Card className=" dark:bg-[#141517] bg-[#FDFDFB] border-[#363638] border rounded-xl px-3 pt-2 pb-3 mt-5">
      <CardHeader className="border-b border-[#363638] flex justify-between">
        <div>
          <h2 className="text-xl font-semibold">Tokenized Carbon Credits</h2>
          <p className="text-sm text-muted-foreground">
            Manage drafts & track minting progress of your carbon credit assets.
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <Tabs
          aria-label="Carbon Assets Current State"
          variant={"underlined"}
          size={"lg"}
        >
          <Tab key="photos" title="Minted">
            <MintedAssetsProgress mintedAssets={mintedAssets} />
          </Tab>
          <Tab key="music" title="Drafts">
            <SavedAsDraftAssets drafts={draft} />
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}

export default AssetsProgress;
