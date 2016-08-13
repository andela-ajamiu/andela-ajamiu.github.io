/*
  still reading about TESTING HTML5 CANVAS with CANTEEN and JSImageDiff,
  Implement it when you are done reading.
*/

// test cases for the clock
describe("degreesToRadians method", function() {
  it("should check for conversion of 180 degrees to radians", function(){
    expect(degreesToRadians(180)).toEqual(Math.PI);
  });
  
  it("should check for conversion of 360 degrees to radians", function(){
    expect(degreesToRadians(360)).toEqual(Math.PI * 2);
  });

  it("should check for null input", function(){
    expect(degreesToRadians()).toBeNaN();
  });

  it("should check for wrong string input type", function(){
    expect(degreesToRadians("apple")).toBeNaN();
  });

  it("should check for empty inputs", function(){
    expect(degreesToRadians("")).toBe(0);
  });

  it("should check for conversion of 90 degrees to radians", function(){
    expect(degreesToRadians(90)).toEqual(Math.PI/2);
  });
  
  it("should check for string input type", function(){
    expect(degreesToRadians("apple")).toBeNaN();
  });

  it("should check for conversion of 540 degrees to radians", function(){
    expect(degreesToRadians(540)).toEqual(Math.PI * 3);
  });

  it("should check for conversion of 720 degrees to radians", function(){
    expect(degreesToRadians(720)).toEqual(Math.PI * 4);
  });
  
  it("should check for conversion of 900 degrees to radians", function(){
    expect(degreesToRadians(900)).toEqual(Math.PI * 5);
  });

});