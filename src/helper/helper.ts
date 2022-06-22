const drawCircleHelper = (radius: number, robot: any): void => {
    const {x ,y} = robot.getMousePos();
    const start_X_Pos = x + (radius * Math.cos(0));
    const start_Y_Pos = y + (radius * Math.sin(0));
    
    robot.dragMouse(start_X_Pos, start_Y_Pos);

    robot.mouseToggle("down");

    for (let i = 0.01; i <= Math.PI * 2; i += 0.01) {
        const drawing_X_coord = x + (radius * Math.cos(i));
        const drawing_Y_coord = y + (radius * Math.sin(i));
        
        robot.dragMouse(drawing_X_coord, drawing_Y_coord);
    }

    robot.mouseToggle("up");
};

const drawSquareHelper = (size: number, robot: any): void => {
    const {x ,y} = robot.getMousePos();
    
    robot.mouseToggle("down");

    for(let j = 0; j <= 3; j++){
        for(let i = 0; i <= size; i ++) {
            if(j === 0){
                robot.dragMouse(x + i, y);
            }
            if(j === 1){
                robot.dragMouse(x + size, y - i);
            }
            if(j === 2){
                robot.dragMouse((x + size) - i, y - size);
            }
            if(j === 3){
                robot.dragMouse(x, (y - size) + i);
            }
        }
    }

    robot.mouseToggle("up");
};

const drawRectangleHelper = (size: number[], robot: any): void => {
    const {x ,y} = robot.getMousePos();
    
    robot.mouseToggle("down");

    for(let j = 0; j <= 3; j++){
        for(let i = 0; i <= size[0]; i++) {
            if(j === 0){
                robot.dragMouse(x + i, y);
            }
            if(j === 2){
                robot.dragMouse((x + size[0]) - i, y - size[1]);
            }
        }

        for(let k = 0; k <= size[1]; k++) {
            if(j === 1){
                robot.dragMouse(x + size[0], y - k);
            }
            if(j === 3){
                robot.dragMouse(x, (y - size[1]) + k);
            }
        }
    }

    robot.mouseToggle("up");
};

export { drawCircleHelper, drawSquareHelper, drawRectangleHelper };
