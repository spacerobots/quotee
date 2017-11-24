module.exports = function(sequelize, DataTypes) {
    
        var Tag = sequelize.define("tag", {
            tag: DataTypes.TEXT            
        }, {
        });
        
        
        return Tag;
    };