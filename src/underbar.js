/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understanding it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    var startIndex = Math.max(0, array.length - n);
    return n !== undefined ? array.slice(startIndex) : array[array.length-1];
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if( Array.isArray(collection) ) {
      for(var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for(var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var results  = [];

    _.each(collection, function(val){
      test(val) && results.push(val);
    });

    return results;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(val) {
      return !test(val);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var obj = {};
    var results = [];

    _.each(array, function(val){
      obj[val] = val;  //this method will malfunction if array vals include numeric strings?
    });

    _.each(obj, function(val){
      results.push(val);
    });

    return results;
  };

  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var results = [];
    _.each(collection, function(val, key, col) {
      results.push(iterator(val, key, col));
    });
    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, function(val){
      var res;
      if(typeof functionOrKey === 'function') {
        res = functionOrKey.apply(val,args);
      } else {
        res = val[functionOrKey].apply(val,args);
      }
      return res;
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    accumulator = (accumulator === undefined) ?  collection[0] : accumulator;
    _.each(collection, function(val) {
      //console.log(accumulator);
      accumulator = iterator(accumulator, val);
    });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    return _.reduce(collection, function(accumulator, val){
      if(accumulator === true) {
        return iterator === undefined ? Boolean(val) : Boolean(iterator(val));
      } else {
        return false;
      }
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if(iterator === undefined) {
      iterator = function(val){return Boolean(val);};
    }

    return !_.every(collection, function(val) {
      return !iterator(val);
    });
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    for (var i = 1; i < arguments.length; i++){
      for (var key in arguments[i]){
        obj[key] = arguments[i][key];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for(var i = 1; i < arguments.length; i++) {
      _.each(arguments[i], function(val, key) {
        if(!(key in obj)) {
          obj[key] = val;
        }
      });
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var results = {};

    return function(){
      var serialization = JSON.stringify(arguments);
      if (!(serialization in results)){
        results[serialization] = func.apply(null, arguments);
      }
      return results[serialization];

    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    setTimeout(function() {
      func.apply(null, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var temp;

    var arr = array.slice();

    for (var i = arr.length - 1; i >= 0; i--){
      var newPosition = Math.floor(Math.random()*i);
      temp = arr[newPosition];
      arr[newPosition] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };



  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    collection.sort(function(a, b) {
      if(typeof iterator === 'function') {
        return iterator(a) - iterator(b);
      } else {
        return a[iterator] - b[iterator];
      }
    });
    return collection;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var results = [];
    var longestArrLength = -1;

    for (var i = 0; i < arguments.length; i++){
      (arguments[i].length > longestArrLength) && (longestArrLength = arguments[i].length);
    }

    for (var i = 0; i < longestArrLength; i++){
      results[i] = [];
      for (var j = 0; j < arguments.length; j++){
        results[i].push(arguments[j][i]);
      }
    }

    return results;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    result = [];

    var processNestedArr = function(array) {
      _.each(array, function(val) {
        if(Array.isArray(val)) {
          processNestedArr(val);
        } else {
          result.push(val);
        }
      });
    };
    processNestedArr(nestedArray);
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var results = [];
    var exists = true;

    for (var item = 0; item < arguments[0].length; item++){
      exists = true;
      for (var arg = 1; arg < arguments.length; arg++){
        if (arguments[arg].indexOf(arguments[0][item]) === -1){
          exists = false;
        }
      }
      if (exists){
        results.push(arguments[0][item]);
      }
    }

    return results;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var results = [];
    var comparisonArrs = Array.prototype.slice.call(arguments, 1);
    comparisonArrs = _.flatten(comparisonArrs);

    _.each(array, function(val) {
      if(comparisonArrs.indexOf(val) === -1) {
        results.push(val);
      }
    });

    return results;
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
    var queueLength = 0; //max que length in this implementation is 1
    var lastExecution = 0; //the latest time the func was called
    var readyTime = 0; //time at which func can be called again
    var result;
    return function(){
      var callTime = Number(new Date());
      if(queueLength === 1) {
        return result;
      } else if (callTime > readyTime){
        result = func.apply(this, arguments);
        readyTime = callTime + wait;
        return result;
      }
      else if (callTime < readyTime) {
        queueLength++;
        setTimeout(function() {
          result = func.apply(this, arguments);
          callTime = Number(new Date());
          readyTime = callTime + wait;
          queueLength--;
        }, readyTime - callTime);
        return result;
      }
    };
  };

}).call(this);
