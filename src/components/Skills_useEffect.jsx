import axios from "axios";
import { useEffect } from "react";

export const Skills = () => {
  const outputTest = () => {
    console.log("TEST");
  };
  // 画面描画（レンダリング時）に実行される→レンダリング時に毎回実行されてしまう(第2引数設定することでその変数:配列の状態変化したときのみ実行される)
  useEffect(outputTest);
  // useEffect(funcX, [userCount, itemCount]);
  //

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
