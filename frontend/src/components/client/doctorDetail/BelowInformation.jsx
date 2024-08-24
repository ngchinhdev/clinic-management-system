import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

export default function BelowInformation() {
  const [activeTab, setActiveTab] = useState("certification");

  return (
    <div className="mx-auto my-10 max-w-screen-xl px-5">
      <Tabs
        defaultValue="certification"
        onValueChange={setActiveTab}
        className="my-5 w-full"
      >
        <TabsList className="w-full gap-1 bg-gray-200 py-7">
          <TabsTrigger
            value="certification"
            className={`w-full p-3 ${activeTab === "certification" ? "shadcn-tabs-active" : ""}`}
          >
            Chứng nhận
          </TabsTrigger>
          <TabsTrigger
            value="experience"
            className={`w-full p-3 ${activeTab === "experience" ? "shadcn-tabs-active" : ""}`}
          >
            Kinh nghiệm
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="certification"
          className="rounded-lg border bg-card bg-white p-6 text-card-foreground shadow-sm"
        >
          <div className="space-y-5">
            <div className="flex flex-col">
              <strong className="mb-2">Trường y:</strong>
              <ul className="pl-12">
                <li className="list-disc">
                  Bác sĩ y khoa, Đại học Y Dược, Thành phố Hồ Chí Minh, Việt
                  Nam, 2002
                </li>
              </ul>
            </div>
            <div className="flex flex-col">
              <strong className="mb-2">Bằng cấp chuyên môn:</strong>
              <ul className="pl-12">
                <li className="list-disc">
                  Thạc sĩ y khoa, Đại học Y Dược, Thành phố Hồ Chí Minh, Việt
                  Nam, 2009
                </li>
                <li className="list-disc">
                  Bác sĩ chuyên khoa II, Gây mê hồi sức, Đại học Y Dược, Hà Nội,
                  Việt Nam, 2020
                </li>
              </ul>
            </div>
            <div className="flex flex-col">
              <strong className="mb-2">Đào tạo nâng cao:</strong>
              <ul className="pl-12">
                <li className="list-disc">
                  Hồi sức Cấp cứu, Đại học Nantes, Pháp, 2006
                </li>
                <li className="list-disc">
                  Liệu pháp thay thế thận liên tục (CRRT), Bệnh viện 115, Thành
                  phố Hồ Chí Minh, Việt Nam, 2012
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
        <TabsContent
          value="experience"
          className="rounded-lg border bg-card bg-white p-6 text-card-foreground shadow-sm"
        >
          <div className="space-y-5">
            <div className="flex flex-col">
              <strong className="mb-2">Kinh nghiệm:</strong>
              <ul className="pl-12">
                <li className="list-disc">
                  Kinh nghiệm hơn 5 năm làm bác sĩ khoa ngoại, 3 năm làm bác sĩ
                  nội thần kinh
                </li>
                <li className="list-disc">
                  Bác sĩ chuyên khoa II, Gây mê hồi sức, Đại học Y Dược, Hà Nội,
                  Việt Nam, 2020
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

