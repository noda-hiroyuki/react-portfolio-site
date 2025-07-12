import axios from "axios";
import { useEffect, useState } from "react";

export const Skills = () => {
  // 指定の変数の値を管理できる（第１引数：対象変数、第２引数：値を設定するメソッド名）
  const [languageList, setLanguageList] = useState([]);
  console.log(languageList);
  useEffect(() => {
    axios
      .get("https://api.github.com/users/noda-hiroyuki/repos")
      .then((response) => {
        const languageList = response.data.map((res) => res.language);
        const countedLanguageList = generateLanguageCountObj(languageList);
        setLanguageList(countedLanguageList);
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
  return (
    <div id="skills">
      <div className="container">
        <div className="heading">
          <h2>Skills</h2>
        </div>
        <div className="skills-container"></div>
      </div>
    </div>
  );
};
