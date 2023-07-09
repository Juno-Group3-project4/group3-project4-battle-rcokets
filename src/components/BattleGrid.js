// BATTLEGRID Component
import axisLabels from "./axisLabels.js";

const BattleGrid = (props) => {

    return (
        <>
            {/* Grid Container */}
            <div className="npcGridContainer">
                {/* Top Header */}
                <div className="topHeaderContainer">
                    {axisLabels[0].xAxis.map((label, index) => {
                        return <div className="topHeader  gridCell" key={index} value={label.value}>{label.textContent}</div>
                    })}
                </div>
                
                {/* Left Header + Play Area of Grid */}
                <div className="bottomGrid">
                    {/* Left Header (1-10) */}
                    <div className="leftHeaderContainer">
                        {axisLabels[1].yAxis.map((label, index) => {
                            return <div className="leftHeader gridCell" key={index} value={label.value}>{label.textContent}</div>
                        })}
                    </div>

                    {/* Grid Play Area */}
                    <div className="gridPlayArea">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default BattleGrid;

