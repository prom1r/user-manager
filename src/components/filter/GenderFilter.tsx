import { ChangeEvent } from "react";

import "./GenderFilter.scss";
interface GenderFilterProps {
  selectedGender: string;
  onGenderChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const GenderFilter: React.FC<GenderFilterProps> = ({
  selectedGender,
  onGenderChange,
}) => {
  return (
    <div className="filter">
      <label htmlFor="gender">Filter by Gender:</label>
      <select id="gender" value={selectedGender} onChange={onGenderChange}>
        <option value="">Select a gender</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
      </select>
    </div>
  );
};

export default GenderFilter;
