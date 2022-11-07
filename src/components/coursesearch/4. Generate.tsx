import { filterDuplicatedSchedules } from "../../helpers/filter";
import { solve } from "../../helpers/solve_newengine";
import { groupSections } from "../../helpers/groupby";
import { useContext, useState } from "react";
import { recommend } from "../../helpers/recommend";
import LoadingButton from "@mui/lab/LoadingButton";
import { SectionsContext } from "../../context/SectionsContext";
import { Section } from "../../data/DataDefinition/SectionDD";
import { CircularProgress } from "@mui/material";

type GenerateProp = {
  fetchReady: boolean
}

export const Generate = ({fetchReady}: GenerateProp) => {
  const { sections, setSections, setRecommended } = useContext(SectionsContext);
  const [loading, setLoading] = useState<boolean>(false);


  /** Update 'los' state with fetched data when a user generates schedule
   * @setLoading (true): turns on loading icon
   * @setLoading (false): turns off loading icon
   */
  const handleGenerate = () => {
    const sectionsNoDuplicate = filterDuplicatedSchedules(sections.flatMap((s:Section) => s));
    const sectionsGroup = groupSections(sectionsNoDuplicate);
    const sectionsSolved = solve(sectionsGroup);
    const sectionsRecommended = recommend(sectionsSolved);
    setSections(sectionsGroup.flatMap((section) => section));
    setRecommended(sectionsRecommended);

  };

  return (
    <>
      <LoadingButton
        sx={{mb:2}}
        loading={loading}
        disabled={!fetchReady}
        className="w-100"
        variant="contained"
        color="primary"
        onClick={() => {
          setLoading(true);   
          handleGenerate();
          setLoading(false);
        }}
      >
        Run
      </LoadingButton>
    </>
  );
};

export default Generate;
