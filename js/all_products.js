// external js: isotope.pkgd.js


// init Isotope
var $grid = $('.grid').isotope({
  itemSelector: '.element-item',
  layoutMode: 'fitRows',
  getSortData: {
    name: '.name',
    symbol: '.symbol',
    number: '.number',
    price: '.price parseInt',
    category: '[data-category]',
    weight: function( itemElem ) {
      var weight = $( itemElem ).find('.weight').text();
      return parseFloat( weight.replace( /[\(\)]/g, '') );
    }
  }
});

// filter functions
var filterFns = {

  // show if number is greater than 5000
  numberlessThan50: function() {
    var number = $(this).find('.number').text();
    return parseInt( number, 5000 ) > 0;
  },

  // show if name ends with -ium
  ium: function() {
    var name = $(this).find('.name').text();
    return name.match( /ium$/ );
  }
};

// SORTS

$('#price-sort').on( 'change', function() {
  var type = $(this).find(':selected').attr('data-sorttype');
  console.log(type);
var sortValue = this.value;
if(type=='ass'){$grid.isotope({ sortBy: sortValue , sortAscending: false});}
  else{$grid.isotope({ sortBy: sortValue , sortAscending: true});}
$grid.isotope({ sortBy: sortValue });
});


// change is-checked class on buttons
$('#price-sort').on( 'change', function() {
var sortByValue = this.value;
console.log(sortByValue);
$grid.isotope({ sortBy: sortByValue});
});

// bind filter button click
$('#filters').on( 'click', 'button', 'div', function() {
  var filterValue = $( this ).attr('data-filter');
  // use filterFn if matches value
  filterValue = filterFns[ filterValue ] || filterValue;
  $grid.isotope({ filter: filterValue });
});

// bind sort button click
$('#sorts').on( 'click', 'option', function() {
  var sortByValue = $(this).attr('data-sort-by');
  $grid.isotope({ sortBy: sortByValue });
});

// change is-checked class on buttons
$('.button-change').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', 'div', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $( this ).addClass('is-checked');
  });
});