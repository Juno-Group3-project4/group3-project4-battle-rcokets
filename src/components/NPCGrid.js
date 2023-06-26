// NON-PLAYER GRID Component

import axisLabels from "./axisLabels.js";
import gridData from "./gridData.js";

const NPCGrid = ({ handleOnDrag, handleDrop }) => {
    return (
        <>
            {/* Grid Container */}
            <div className="npcGridContainer">
                {/* Top Header */}
                <div className="topHeaderContainer">
                    {axisLabels[0].xAxis.map((label, index) => {
                        return <div className="topHeader gridCell" key={index} value={label.value}>{label.textContent}</div>
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
                        {gridData.map((gridRow, index) => {
                            return (
                                <div key={index} id={index} className="gridRow">
                                    {gridRow.map((gridColumn) => {
                                        return (
                                            <div
                                                className={gridColumn.className}
                                                key={gridColumn.id}
                                                id={gridColumn.id}
                                                value={gridColumn.id}
                                                onDragOver={handleOnDrag}
                                                onDrop={handleDrop}
                                                valuex={gridColumn.x_value}
                                                valuey={gridColumn.y_value}
                                            >
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default NPCGrid;

