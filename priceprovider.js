var PriceListCounter = 1;

PriceProvider = function(){};
PriceProvider.prototype.dummyData = [];

PriceProvider.prototype.findAll = function(callback) {
  callback( null, this.dummyData )
};

PriceProvider.prototype.findById = function(id, callback) {
  var result = null;
  for(var i =0;i<this.dummyData.length;i++) {
    if( this.dummyData[i]._id == id ) {
      result = this.dummyData[i];
      break;
    }
  }
  callback(null, result);
};

PriceProvider.prototype.save = function(PriceLists, callback) {
  var PriceList = null;

  if( typeof(PriceLists.length)=="undefined")
    PriceLists = [PriceLists];

  for( var i =0;i< PriceLists.length;i++ ) {
    PriceList = PriceLists[i];
    PriceList._id = PriceListCounter++;
    PriceList.created_at = new Date();

    if( PriceList.comments === undefined )
      PriceList.comments = [];

    for(var j =0;j< PriceList.comments.length; j++) {
      PriceList.comments[j].created_at = new Date();
    }
    this.dummyData[this.dummyData.length]= PriceList;
  }
  callback(null, PriceLists);
};

/* Lets bootstrap with dummy data */
new PriceProvider().save([
  {title: 'Post one', body: 'Body one'},
  {title: 'Post two', body: 'Body two'},
  {title: 'Post three', body: 'Body three'}
], function(error, PriceLists){});

exports.PriceProvider = PriceProvider;