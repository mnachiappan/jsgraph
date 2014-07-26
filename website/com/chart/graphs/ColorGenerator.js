var ColorGenerator = (function(){
    function ColorGenerator(){
        this.currentColor = -1;
    }

    ColorGenerator.prototype.getNextColor = function(){
        if(this.currentColor >= this.color_data.length - 1){
            this.currentColor = 0;
        }else{
            this.currentColor = this.currentColor + 1;
        }
        var color = this.color_data[this.currentColor];
        
        return color;
    }

    ColorGenerator.prototype.color_data = [
        //{r: 240, g: 248, b: 255}, //"aliceblue": 
        {r: 218, g: 165, b: 32}, //"goldenrod": 
        {r: 119, g: 136, b: 153}, //"lightslategrey": 
        {r: 70, g: 130, b: 180}, //"steelblue": 
        {r: 147, g: 112, b: 216}, //"mediumpurple": 
        {r: 222, g: 184, b: 135} //"burlywood": 
    ];
    return ColorGenerator;
})();