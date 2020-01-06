const List = require('../src/List');

describe('List', function () {
    describe('1) #add', function () {
        describe('1.1) #should correct add one value in the empty list', function () {
            let list;
            beforeEach(function () {
                list = new List();
                list.add(1);
            });

            it("value of the head in the list should be the value that we added", function () {
                expect(list.head.value).to.be.equal(1);
            });

            it("head.next should be equal null", function () {
                expect(list.head.next).to.be.null;
            });

            it("head.prev should be equal null", function () {
                expect(list.head.prev).to.be.null;
            });

            it("the length of the list should be equal 1", function () {
                expect(list.length).to.be.equal(1);
            });
        })

        describe('1.2) #should correct add two values in the empty list', function () {
            let list;
            beforeEach(function () {
                list = new List();
                list.add(1);
                list.add(2);
            });

            it("value of the head in the list should be the value that we added last", function () {
                expect(list.head.value).to.be.equal(2);
            });

            it("head.prev should be equal null", function () {
                expect(list.head.prev).to.be.null;
            });

            it("value of the head.next should be equal first value that we added", function () {
                expect(list.head.next.value).to.be.equal(1);
            });

            it("head.next.next should be equal null", function () {
                expect(list.head.next.next).to.be.null;
            });

            it("value of the head.next.prev should be equal head value", function () {
                expect(list.head.next.prev.value).to.be.equal(2);
            });

            it("the length of the list should be equal 2", function () {
                expect(list.length).to.be.equal(2);
            });
        })

        describe('1.3) #should correct add one value in the list with 3 values', function () {
            let list;
            beforeEach(function () {
                list = new List(1, 2, 3);
                list.add(4);
            });

            it("value of the head in the list should be the value that we added", function () {
                expect(list.head.value).to.be.equal(4);
            });

            it("head.prev should be equal null", function () {
                expect(list.head.prev).to.be.null;
            });

            it("value of the head.next should be equal last value in the list before value that we added", function () {
                expect(list.head.next.value).to.be.equal(3);
            });

            it("value of the head.next.next should be equal prelast value in the list before value that we added", function () {
                expect(list.head.next.next.value).to.be.equal(2);
            });

            it("value of the head.next.prev should be equal head value (or value that we added)", function () {
                expect(list.head.next.prev.value).to.be.equal(4);
            });

            it("the length of the list should be equal 4", function () {
                expect(list.length).to.be.equal(4);
            });
        })

        describe('1.4) #should correct add two values in the list with 3 values', function () {
            let list;
            beforeEach(function () {
                list = new List(1, 2, 3);
                list.add(4);
                list.add(5);
            });

            it("value of the head in the list should be the value that we added last", function () {
                expect(list.head.value).to.be.equal(5);
            });

            it("head.prev should be equal null", function () {
                expect(list.head.prev).to.be.null;
            });

            it("value of the head.next should be equal first value that we added", function () {
                expect(list.head.next.value).to.be.equal(4);
            });

            it("value of the head.next.next should be equal last value in the list before values that we added", function () {
                expect(list.head.next.next.value).to.be.equal(3);
            });

            it("value of the head.next.prev should be equal head value (or value that we added last)", function () {
                expect(list.head.next.prev.value).to.be.equal(5);
            });

            it("the length of the list should be equal 5", function () {
                expect(list.length).to.be.equal(5);
            });
        })

        describe('1.5) #should return TypeError with error message if adding value is not an integer number', function () {
            let list;
            beforeEach(function () {
                list = new List(10, 20, 30, 40, 50, 60);
            });

            it('should return TypeError with error message if adding value is the string', function () {
                let result = list.add('someString');

                expect(result).to.throw(
                    TypeError,
                    "Strings are not allowed for add method. The adding value must be an integer number."
                )
            })

            it('should return TypeError with error message if adding value is the float number', function () {
                let result = list.add(123.456);

                expect(result).to.throw(
                    TypeError,
                    "Float numbers are not allowed for add method. The adding value must be an integer number."
                )
            })

            it('should return TypeError with error message if adding value is the Infinity', function () {
                let result = list.add(Infinity);

                expect(result).to.throw(
                    TypeError,
                    "Infinity are not allowed for add method. The adding value must be an integer number."
                )
            })

            it('should return TypeError with error message if adding value is the -Infinity', function () {
                let result = list.add(-Infinity);

                expect(result).to.throw(
                    TypeError,
                    "-Infinity are not allowed for add method. The adding value must be an integer number."
                )
            })

            it('should return TypeError with error message if adding value is the NaN', function () {
                let result = list.add(NaN);

                expect(result).to.throw(
                    TypeError,
                    "NaN are not allowed for add method. The adding value must be an integer number."
                )
            })

            it('should return TypeError with error message if adding value is the Array', function () {
                let result = list.add([123]);

                expect(result).to.throw(
                    TypeError,
                    "Arrays are not allowed for add method. The adding value must be an integer number."
                )
            })

            it('should return TypeError with error message if adding value is the Object', function () {
                let result = list.add({ 123: '456' });

                expect(result).to.throw(
                    TypeError,
                    "Objects are not allowed for add method. The adding value must be an integer number."
                )
            })
        })
    })

    describe('2) #getAt', function () {

        describe('2.1) #should correct returns first value in the List', function () {
            let list;
            let result;
            beforeEach(function () {
                list = new List(10, 20, 30, 40, 50, 60);
                result = list.getAt(0);
            });

            it('value which returns should be equal first value in the list', function () {
                expect(result.value).to.equal(10);
            })

            it('(return value).next.value should be second value in the list', function () {
                expect(result.next.value).to.be.equal(20);
            })

            it('(return value).prev should be equal null', function () {
                expect(result.prev).to.be.null;
            })
        })

        describe('2.2) #should correct returns third value in the List', function () {
            let list;
            let result;
            beforeEach(function () {
                list = new List(10, 20, 30, 40, 50, 60);
                result = list.getAt(2);
            });

            it('value which returns should be equal third value in the list', function () {
                expect(result.value).to.equal(30);
            })

            it('(return value).next.value should be fourth value in the list', function () {
                expect(result.next.value).to.be.equal(40);
            })

            it('(return value).prev.value should be second value in the list', function () {
                expect(result.prev.value).to.be.equal(20);
            })
        })

        describe('2.3) #should correct returns last value in the List', function () {
            let list;
            let result;
            beforeEach(function () {
                list = new List(10, 20, 30, 40, 50, 60);
                result = list.getAt(5);
            });

            it('value which returns should be equal last value in the list', function () {
                expect(result.value).to.equal(60);
            })

            it('(return value).next should be equal null', function () {
                expect(result.next).to.be.null;
            })

            it('(return value).prev.value should be prelast value in the list', function () {
                expect(result.prev.value).to.be.equal(50);
            })
        })

        describe('2.4) #should return RangeError with error message if index less than 0 or more than list\'s length - 1', function () {
            let list;
            beforeEach(function () {
                list = new List(10, 20, 30, 40, 50, 60);
            });

            it('should return RangeError with error message if index less than 0', function () {
                let result = list.getAt(-2);

                expect(result).to.throw(
                    RangeError,
                    "Index must be greater or equal 0 and less than (list.length -1)"
                )
            })

            it('should return RangeError with error message if index more than list\'s length - 1', function () {
                let result = list.getAt(12);

                expect(result).to.throw(
                    RangeError,
                    "Index must be greater or equal 0 and less than (list.length -1)"
                )
            })
        })
        
        describe('2.5) #should return TypeError with error message if getting index is not an integer number', function () {
            let list;
            beforeEach(function () {
                list = new List(10, 20, 30, 40, 50, 60);
            });

            it('should return TypeError with error message if getting index is the string', function () {
                let result = list.getAt('someString');

                expect(result).to.throw(
                    TypeError,
                    "Strings are not allowed for getAt method. The index must be an integer number."
                )
            })

            it('should return TypeError with error message if getting index is the float number', function () {
                let result = list.getAt(123.456);

                expect(result).to.throw(
                    TypeError,
                    "Float numbers are not allowed for getAt method. The index must be an integer number."
                )
            })

            it('should return TypeError with error message if getting index is the Infinity', function () {
                let result = list.getAt(Infinity);

                expect(result).to.throw(
                    TypeError,
                    "Infinity are not allowed for getAt method. The index must be an integer number."
                )
            })

            it('should return TypeError with error message if getting index is the -Infinity', function () {
                let result = list.getAt(-Infinity);

                expect(result).to.throw(
                    TypeError,
                    "-Infinity are not allowed for getAt method. The index must be an integer number."
                )
            })

            it('should return TypeError with error message if getting index is the NaN', function () {
                let result = list.getAt(NaN);

                expect(result).to.throw(
                    TypeError,
                    "NaN are not allowed for getAt method. The index must be an integer number."
                )
            })

            it('should return TypeError with error message if getting index is the Array', function () {
                let result = list.getAt([123]);

                expect(result).to.throw(
                    TypeError,
                    "Arrays are not allowed for getAt method. The index must be an integer number."
                )
            })

            it('should return TypeError with error message if getting index is the Object', function () {
                let result = list.getAt({ 123: '456' });

                expect(result).to.throw(
                    TypeError,
                    "Objects are not allowed for getAt method. The index must be an integer number."
                )
            })
        })
    })

    describe('3) #removeAt', function () {
        describe('3.1) #should correct remove first value in the list with 6 values', function () {
            let list;
            beforeEach(function () {
                list = new List(10, 20, 30, 40, 50, 60);
                list.removeAt(0);
            });

            it("value of the head in the list should be the value that was second before removing", function () {
                expect(list.head.value).to.be.equal(20);
            });

            it("head.prev should be equal null", function () {
                expect(list.head.prev).to.be.null;
            });

            it("value of the head.next should be equal the value that was third before removing", function () {
                expect(list.head.next.value).to.be.equal(30);
            });

            it("value of the head.next.next should be equal the value that was fourth before removing", function () {
                expect(list.head.next.next.value).to.be.equal(40);
            });

            it("value of the head.next.prev should be equal head value (or value that was second before removing)", function () {
                expect(list.head.next.prev.value).to.be.equal(20);
            });

            it("the length of the list should be equal 5", function () {
                expect(list.length).to.be.equal(5);
            });
        })

        describe('3.2) #should correct remove third value in the list with 6 values', function () {
            let list;
            beforeEach(function () {
                list = new List(10, 20, 30, 40, 50, 60);
                list.removeAt(2);
            });

            it("value of the head in the list should be the same as before removing third value", function () {
                expect(list.head.value).to.be.equal(10);
            });

            it("head.next.next.value should be equal the value that was fourth before removing", function () {
                expect(list.head.next.next.value).to.be.equal(40);
            });

            it("head.next.next.next.value should be equal the value that was fifth before removing", function () {
                expect(list.head.next.next.next.value).to.be.equal(50);
            });

            it("head.next.next.prev.value should be equal the value that was second before removing", function () {
                expect(list.head.next.next.prev.value).to.be.equal(20);
            });

            it("the length of the list should be equal 5", function () {
                expect(list.length).to.be.equal(5);
            });
        })

        describe('3.3) #should correct remove last value in the list with 4 values', function () {
            let list;
            beforeEach(function () {
                list = new List(10, 20, 30, 40);
                list.removeAt(3);
            });

            it("value of the head in the list should be the same as before removing last value", function () {
                expect(list.head.value).to.be.equal(10);
            });

            it("head.next.next.value should be the same as before removing last value", function () {
                expect(list.head.next.next.value).to.be.equal(30);
            });

            it("head.next.next.next should be equal null", function () {
                expect(list.head.next.next.next).to.be.null;
            });

            it("head.next.next.prev.value should be the same as before removing last value", function () {
                expect(list.head.next.next.prev.value).to.be.equal(20);
            });

            it("the length of the list should be equal 3", function () {
                expect(list.length).to.be.equal(3);
            });
        })

        describe('3.4) #should correct remove value in the list with 1 value', function () {
            let list;
            beforeEach(function () {
                list = new List(10);
                list.removeAt(0);
            });

            it("the head in the list should be equal null", function () {
                expect(list.head).to.be.null();
            });

            it("the next in the list should be equal null", function () {
                expect(list.next).to.be.null();
            });

            it("the length of the list should be equal 0", function () {
                expect(list.length).to.be.equal(0);
            });
        })

        describe('3.5) #should return RangeError with error message if index less than 0 or more than list\'s length - 1', function () {
            let list;
            beforeEach(function () {
                list = new List(10, 20, 30, 40, 50, 60);
            });

            it('should return RangeError with error message if index less than 0', function () {
                let result = list.removeAt(-2);

                expect(result).to.throw(
                    RangeError,
                    "Index must be greater or equal 0 and less than (list.length -1)"
                )
            })

            it('should return RangeError with error message if index more than list\'s length - 1', function () {
                let result = list.removeAt(12);

                expect(result).to.throw(
                    RangeError,
                    "Index must be greater or equal 0 and less than (list.length -1)"
                )
            })
        })

        describe('3.6) #should return TypeError with error message if searching value is not an integer number', function () {
            let list;
            beforeEach(function () {
                list = new List(10, 20, 30, 40, 50, 60);
            });

            it('should return TypeError with error message if searching value is the string', function () {
                let result = list.removeAt('someString');

                expect(result).to.throw(
                    TypeError,
                    "Strings are not allowed for removeAt method. The index must be an integer number."
                )
            })

            it('should return TypeError with error message if searching value is the float number', function () {
                let result = list.removeAt(123.456);

                expect(result).to.throw(
                    TypeError,
                    "Float numbers are not allowed for removeAt method. The index must be an integer number."
                )
            })

            it('should return TypeError with error message if searching value is the Infinity', function () {
                let result = list.removeAt(Infinity);

                expect(result).to.throw(
                    TypeError,
                    "Infinity are not allowed for removeAt method. The index must be an integer number."
                )
            })

            it('should return TypeError with error message if searching value is the -Infinity', function () {
                let result = list.removeAt(-Infinity);

                expect(result).to.throw(
                    TypeError,
                    "-Infinity are not allowed for removeAt method. The index must be an integer number."
                )
            })

            it('should return TypeError with error message if searching value is the NaN', function () {
                let result = list.removeAt(NaN);

                expect(result).to.throw(
                    TypeError,
                    "NaN are not allowed for removeAt method. The index must be an integer number."
                )
            })

            it('should return TypeError with error message if searching value is the Array', function () {
                let result = list.removeAt([123]);

                expect(result).to.throw(
                    TypeError,
                    "Arrays are not allowed for removeAt method. The index must be an integer number."
                )
            })

            it('should return TypeError with error message if searching value is the Object', function () {
                let result = list.removeAt({ 123: '456' });

                expect(result).to.throw(
                    TypeError,
                    "Objects are not allowed for removeAt method. The index must be an integer number."
                )
            })
        })
    })

    describe('4) #indexOf', function () {
        describe('4.1) #should return wright indexex of search elements in the list', function () {
            let list;
            beforeEach(function () {
                list = new List(10, 20, 30, 40, 50, 60);
            });
        })

        it('should return first index of element in the list', function () {
            const result = list.indexOf(10);
            expect(result).to.be.equal(0);
        })

        it('should return third index of element in the list', function () {
            const result = list.indexOf(30);
            expect(result).to.be.equal(2);
        })

        it('should return last index of element in the list', function () {
            const result = list.indexOf(60);
            expect(result).to.be.equal(5);
        })

        describe('4.2) #should return -1 if searching value do not matched in the list', function () {
            let list;
            beforeEach(function () {
                list = new List(10, 20, 30, 40, 50, 60);
            });

            it('should return -1 if searching value less than 0', function () {
                const result = list.indexOf(123);
                expect(result).to.be.equal(-1);
            })

            it('should return -1 if searching value a big integer', function () {
                const result = list.indexOf(123456789);
                expect(result).to.be.equal(-1);
            })
        })

        describe('4.3) #should return TypeError with error message if searching value is not an integer number', function () {
            let list;
            beforeEach(function () {
                list = new List(10, 20, 30, 40, 50, 60);
            });

            it('should return TypeError with error message if searching value is the string', function () {
                let result = list.indexOf('someString');

                expect(result).to.throw(
                    TypeError,
                    "Strings are not allowed for indexOf method. The searching value must be an integer number."
                )
            })

            it('should return TypeError with error message if searching value is the float number', function () {
                let result = list.indexOf(123.456);

                expect(result).to.throw(
                    TypeError,
                    "Float numbers are not allowed for indexOf method. The searching value must be an integer number."
                )
            })

            it('should return TypeError with error message if searching value is the Infinity', function () {
                let result = list.indexOf(Infinity);

                expect(result).to.throw(
                    TypeError,
                    "Infinity are not allowed for indexOf method. The searching value must be an integer number."
                )
            })

            it('should return TypeError with error message if searching value is the -Infinity', function () {
                let result = list.indexOf(-Infinity);

                expect(result).to.throw(
                    TypeError,
                    "-Infinity are not allowed for indexOf method. The searching value must be an integer number."
                )
            })

            it('should return TypeError with error message if searching value is the NaN', function () {
                let result = list.indexOf(NaN);

                expect(result).to.throw(
                    TypeError,
                    "NaN are not allowed for indexOf method. The searching value must be an integer number."
                )
            })

            it('should return TypeError with error message if searching value is the Array', function () {
                let result = list.indexOf([123]);

                expect(result).to.throw(
                    TypeError,
                    "Arrays are not allowed for indexOf method. The searching value must be an integer number."
                )
            })

            it('should return TypeError with error message if searching value is the Object', function () {
                let result = list.indexOf({ 123: '456' });

                expect(result).to.throw(
                    TypeError,
                    "Objects are not allowed for indexOf method. The searching value must be an integer number."
                )
            })
        })
    });
})

