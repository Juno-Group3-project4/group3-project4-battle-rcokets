// NON-PLAYER GRID Component

import axisLabels from "./axisLabels.js";
import gridData from "./gridData.js";

const NPCGrid = ({ handleOnDrag, handleDrop }) => {
    return (
        <>
            {/* Grid Container */}
            <div className="npcGrid_Container">
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
                        <div className="column">
                            {gridData[0].columnA.map((cell) => {
                                return (
                                    <div 
                                        className={cell.className} 
                                        key={cell.id} id={cell.id} valuex={cell.x_value} 
                                        valuey={cell.y_value}
                                        onDragOver={handleOnDrag}
                                        onDrop={handleDrop}
                                    >
                                    </div>
                                )
                            })}
                        </div>

                        <div className="column">
                            {gridData[1].columnB.map((cell) => {
                                return (
                                    <div
                                        className={cell.className}
                                        key={cell.id} id={cell.id} valuex={cell.x_value}
                                        valuey={cell.y_value}
                                        onDragOver={handleOnDrag}
                                        onDrop={handleDrop}
                                    >
                                    </div>
                                )
                            })}
                        </div>
                        <div className="column">
                            {gridData[2].columnC.map((cell) => {
                                return (
                                    <div
                                        className={cell.className}
                                        key={cell.id} id={cell.id} valuex={cell.x_value}
                                        valuey={cell.y_value}
                                        onDragOver={handleOnDrag}
                                        onDrop={handleDrop}
                                    >
                                    </div>
                                )
                            })}
                        </div>
                        <div className="column">
                            {gridData[3].columnD.map((cell) => {
                                return (
                                    <div
                                        className={cell.className}
                                        key={cell.id} id={cell.id} valuex={cell.x_value}
                                        valuey={cell.y_value}
                                        onDragOver={handleOnDrag}
                                        onDrop={handleDrop}
                                    >
                                    </div>
                                )
                            })}
                        </div>
                        <div className="column">
                            {gridData[4].columnE.map((cell) => {
                                return (
                                    <div
                                        className={cell.className}
                                        key={cell.id} id={cell.id} valuex={cell.x_value}
                                        valuey={cell.y_value}
                                        onDragOver={handleOnDrag}
                                        onDrop={handleDrop}
                                    >
                                    </div>
                                )
                            })}
                        </div>
                        <div className="column">
                            {gridData[5].columnF.map((cell) => {
                                return (
                                    <div
                                        className={cell.className}
                                        key={cell.id} id={cell.id} valuex={cell.x_value}
                                        valuey={cell.y_value}
                                        onDragOver={handleOnDrag}
                                        onDrop={handleDrop}
                                    >
                                    </div>
                                )
                            })}
                        </div>
                        <div className="column">
                            {gridData[6].columnG.map((cell) => {
                                return (
                                    <div
                                        className={cell.className}
                                        key={cell.id} id={cell.id} valuex={cell.x_value}
                                        valuey={cell.y_value}
                                        onDragOver={handleOnDrag}
                                        onDrop={handleDrop}
                                    >
                                    </div>
                                )
                            })}
                        </div>
                        <div className="column">
                            {gridData[7].columnH.map((cell) => {
                                return (
                                    <div
                                        className={cell.className}
                                        key={cell.id} id={cell.id} valuex={cell.x_value}
                                        valuey={cell.y_value}
                                        onDragOver={handleOnDrag}
                                        onDrop={handleDrop}
                                    >
                                    </div>
                                )
                            })}
                        </div>
                        <div className="column">
                            {gridData[8].columnI.map((cell) => {
                                return (
                                    <div
                                        className={cell.className}
                                        key={cell.id} id={cell.id} valuex={cell.x_value}
                                        valuey={cell.y_value}
                                        onDragOver={handleOnDrag}
                                        onDrop={handleDrop}
                                    >
                                    </div>
                                )
                            })}
                        </div>
                        <div className="column">
                            {gridData[9].columnJ.map((cell) => {
                                return (
                                    <div
                                        className={cell.className}
                                        key={cell.id} id={cell.id} valuex={cell.x_value}
                                        valuey={cell.y_value}
                                        onDragOver={handleOnDrag}
                                        onDrop={handleDrop}
                                    >
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NPCGrid;

{/* <NPCGrid
    handleOnDrag={handleOnDrag}
    handleDrop={handleDrop}
/> */}