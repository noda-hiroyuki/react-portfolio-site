import axios from "axios";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useReducer, useState } from "react";
import {
  skillReducer,
  initialState,
  actionTypes,
} from "../reducers/skillReducer";
import { requestStates } from "../constants";
import { CircularProgressbar } from "react-circular-progressbar";

export const Skills = () => {
  const [state, dispatch] = useReducer(skillReducer, initialState);
  useEffect(() => {
    dispatch({ type: actionTypes.fetch });
    axios
      .get("https://api.github.com/users/noda-hiroyuki/repos")
      .then((response) => {
        const languageList = response.data.map((res) => res.language);
        const countedLanguageList = generateLanguageCountObj(languageList);
        dispatch({
          type: actionTypes.success,
          payload: { languageList: countedLanguageList },
        });
      })
      .catch(() => {
        dispatch({ type: actionTypes.error });
      });
  }, []);

  const generateLanguageCountObj = (allLanguageList) => {
    const notNullLanguageList = allLanguageList.filter(
      (language) => language != null
    );
    // 重複値を除いた値で新しい配列を生成する
    const uniqueLanguageList = [...new Set(notNullLanguageList)];

    return uniqueLanguageList.map((item) => {
      return {
        language: item,
        count: allLanguageList.filter((language) => language === item).length,
      };
    });
  };

  const convertCountToPercentage = (count) => {
    if (count > 10) {
      return 100;
    }
    return count * 10;
  };

  // 言語が多い順にソート
  const sortedLanguageList = () =>
    state.languageList.sort(
      (firstLang, nextLang) => nextLang.count - firstLang.count
    );

  return (
    <div id="skills">
      <div className="container">
        <div className="heading">
          <h2>Skills</h2>
        </div>
        <div className="skills-container">
          {/* API取得状態View */}
          {state.requestState === requestStates.loading && (
            <p className="description">取得中...</p>
          )}
          {state.requestState === requestStates.success &&
            sortedLanguageList().map((item, index) => (
              <div className="skill-item" key={index}>
                <p className="description">
                  <strong>{item.language}</strong>
                </p>
                <CircularProgressbar
                  value={convertCountToPercentage(item.count)}
                  text={`${convertCountToPercentage(item.count)}%`}
                />
              </div>
            ))}
          {state.requestState === requestStates.error && (
            <p className="description">エラーが発生しました</p>
          )}
        </div>
      </div>
    </div>
  );
};
