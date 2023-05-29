pragma solidity ^0.8.0;

contract DoNotGiveUp {
  struct SurveyData {
    // Define the structure of your survey data
    string Q1;
    string Q2;
    string Q3;
    string Q4;
    string Q5;
    string Q6;
  }

  struct StudyData {
    uint32 id;
    uint8 score;
    uint32 time;
  }

  mapping(address => SurveyData) private userSurveyData;
  mapping(address => StudyData[]) private userStudyData;

  function setSurveyData(string calldata _Q1, string calldata _Q2, string calldata _Q3, string calldata _Q4, string calldata _Q5, string calldata _Q6) public {
    SurveyData storage survey = userSurveyData[msg.sender];
    survey.Q1 = _Q1;
    survey.Q2 = _Q2;
    survey.Q3 = _Q3;
    survey.Q4 = _Q4;
    survey.Q5 = _Q5;
    survey.Q6 = _Q6;
  }

  function getSurveyData(address _userAddress) public view returns (string memory, string memory, string memory, string memory, string memory, string memory) {
    SurveyData storage survey = userSurveyData[_userAddress];
    return (survey.Q1, survey.Q2, survey.Q3, survey.Q4, survey.Q5, survey.Q6);
  }

  function setStudyData(uint32 _id, uint8 _score, uint32 _time) public {
    userStudyData[msg.sender].push(StudyData(_id, _score, _time));
  }

  function getStudyData(address _userAddress) public view returns (StudyData[] memory) {
    return userStudyData[_userAddress];
  }
}
