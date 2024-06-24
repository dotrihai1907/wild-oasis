import { useSearchParams } from "react-router-dom";
import Select from "./Select";

type Option = {
  value: string;
  label: string;
};

type SortByProps = {
  options: Option[];
};

const SortBy = ({ options }: SortByProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") ?? options[0].value;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      type="white"
      value={sortBy}
      options={options}
      onChange={handleChange}
    />
  );
};

export default SortBy;
