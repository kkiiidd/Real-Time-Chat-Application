import React from "react";
import MomentCard from "./MomentCard";

export const Moment = () => {
  return (
    <div className="moment">
      <div className="moment-list">
        <div className="moment-item">
          <MomentCard />
        </div>
        <div className="moment-item">
          <MomentCard />
        </div>
        <div className="moment-item">
          <MomentCard />
        </div>
        <div className="moment-item">
          <MomentCard />
        </div>
        <div className="moment-item">
          <MomentCard />
        </div>
      </div>
    </div>
  );
};
