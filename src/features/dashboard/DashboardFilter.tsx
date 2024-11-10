import Filter from "../../ui/Filter";

const DASHBOARD_OPTIONNS = [
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
];

const DashboardFilter = () => {
  return <Filter filterField="last" options={DASHBOARD_OPTIONNS} />;
};

export default DashboardFilter;
