var LabelData = (function basicChartClosure(){
    var _labelTag = "label";
    var _elemTag = "elem";
    function LabelData(){
        this.labels = [];
        this.datasets = [];
        function _fillArray(value, len) {
          var arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(value);
          };
          return arr;
        };

        function _createLabelElement(value){
            var result = {};
            result[_labelTag] = value;
            return result;
        };

        function _createDataElement(value){
            var result = {};
            result[_elemTag] = value;
            return result;
        };

        this.getLabels = function(){
            return this.labels;
        };

        /*
        Append labels to end of current label set.
        Also update the datasets, so that each set has new data elements.
        Example:
        INPUT
        newLabels = ["Hello", "Hi"]
        RESULT
        this.labels = [..., {"label": "Hello"}, {"label": "Hi"}]
        this.datasets [{..., "data": [...,{"elem": 0}, {"elem": 0}]}]
        */
        this.addLabels = function(newLabels){
            var labelsLength = newLabels.length;
            for(var i = 0; i < labelsLength; i++){
                this.labels.push(_createLabelElement(newLabels[i]));
            }

            for (var i = 0; i < this.datasets.length; i++){
                for (var j = 0; j < this.labels.length - this.datasets[i].data.length; j++){
                    this.datasets[i].data.push(_createDataElement(0));
                }
            }
        };

        // Changes the label of an existing label, given a new label and the index location.
        // Example:
        // INPUT
        // newLabel = "Jan"
        // location = 1
        // RESULT
        // 
        
        this.setLabel = function(newLabel, location){
            if(location >= this.labels.length){
                console.log("Attempted to add new label: " + newLabel + ", at location: " + location + ".");
            }else{
                this.labels[location][_labelTag] = newLabel;
            }
        };

        this.flattenLabels = function(){
            var labels = [];
            for(var i = 0; i < this.labels.length; i++){
                labels.push(this.labels[i][_labelTag]);
            }
            return labels;
        };
    };

    // Add n labels to default labels
    LabelData.prototype.addNLabels = function(n){
        var labels = [];
        for (var i = 0; i < n; i++){
            labels.push("label");
        }
        this.addLabels(labels);
    };

    LabelData.prototype.removeLabel = function (index) {
        if((this.labels.length - 1) <= 1){
            return;
        }
      if(index < this.labels.length){
          this.labels.splice(index, 1);
          for(var i = 0; i < this.datasets.length; i++){
              this.datasets[i].data.splice(index, 1);
          }
      }
    };

    return LabelData;
})();




