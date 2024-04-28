import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ConfirmModal from "./modals/ConfirmModal";
import UsersTab from "./tabs/UsersTab";
import FeedsTab from "./tabs/FeedsTab";
import FriendsTab from "./tabs/FriendsTab";
import RequestTabs from "./tabs/RequestTabs";
function TabSec() {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  // const handleShowModal = () => setShowModal(true);
  const [activeTab, setActiveTab] = useState("Feeds"); 
  return (
    <div className="container" style={{ marginTop: "70px" }}>
      <Tabs
        id="fill-tab-example"
        activeKey={activeTab}
        onSelect={(tab) => setActiveTab(tab)} 
        className="mb-3"
        fill
      >
        <Tab eventKey="Feeds" title="Feeds">
          {activeTab === "Feeds" && <FeedsTab />}
        </Tab>
        <Tab eventKey="Friends" title="Friends">
          {activeTab === "Friends" && <FriendsTab />}
        </Tab>
        <Tab eventKey="All-Users" title="All Users">
          {activeTab === "All-Users" && <UsersTab />}
        </Tab>
        <Tab eventKey="Requests" title="Requests">
          {activeTab === "Requests" && <RequestTabs />}
        </Tab>
      </Tabs>
      <ConfirmModal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
}
export default TabSec;
