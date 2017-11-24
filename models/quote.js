module.exports = function(sequelize, DataTypes) {

    var Quote = sequelize.define("quote", {
        quote: DataTypes.TEXT,
        totalvotes: DataTypes.INTEGER,
        totalscore: DataTypes.INTEGER,
        submitted_by: {
            type: DataTypes.INTEGER,
            allowNull: false
        }, 
        date_submitted: DataTypes.DATE,
        title: DataTypes.STRING
    }, {
        underscored: true,
        freezeTableName: false
    });
    
    Quote.associate = function(models) {
        // Quote.hasMany(models.Tag, {} );
    }
    return Quote;
};