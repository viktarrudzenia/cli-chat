// const Node = require('../src/Node');
const List = require('../src/List');

describe('List', function () {
    describe('#add', function () {
        // beforeEach(function () { const list = new List() });

        it("should correct insests 1 value in list", function () {
            const list = new List()
            list.add(1);
            expect(list.head).to.be.equal(Node(1));
            expect(list.head.next).to.be.null;
        });

        it("should correct insests values in list", function () {
            const list = new List()
            list.add(1);
            list.add(2)
            expect(list.head).to.be.equal(Node(1));
            expect(list.head.next).to.be.equal(Node(2));

        });

        it('should returns correct length of list', function () {
            const list = new List()
            list.add(1);
            expect(list.length).to.be.equal(Node(1));

            list.add(2);
            expect(list.length).to.be.equal(Node(2));
        });
    })

    describe('#getAt', function () {

        const list = new List();
        list.add(2);
        list.add(4);
        list.add(6);
        list.add(8);

        it('should returns correct value in the List', function () {
            let result = list.getAt(3);
            expect(result).to.equal(Node(8));
            expect(result.next).to.be.null;
        })

        it('shold return null if list\'s length less or more than value', function () {
            let result = list.getAt(10);

            expect(result).to.be.null;
        })
    })

    describe('#removeAt', function () {

        const list = new List();

        list.add(1);
        list.add(2);
        list.add(3);
        list.removeAt(0);

        const result = list.getAt(0);

        it('should correct return item after removeAt in list', () => {

            expect(result).to.equal(Node(2));
        });

        it('should correct update head of the list', () => {
            expect(list.head).to.equal(Node(2));
        });

        it('should correct update list.next position', () => {
            expect(list.next).to.equal(Node(3));
        });

        it('should correct update length of the list', () => {
            expect(list.lenth).to.equal(Node(2));
        });

        it('should correct delete 1-item list', () => {
            const list = new List();

            list.add(1);
            list.removeAt(0);

            expect(list.head).to.be.null;
        });

    })

    describe('#indexOf', function () {
        const list = new List();
        list.add(2);
        list.add(4);
        list.add(6);
        list.add(8);
        list.add(10);

        it('should returns wright posititon of element in List №1', function () {
            const result = list.indexOf(6);
            expect(result).to.be.equal(2);
        })

        it('should returns wright posititon of element in List №2', function () {
            const result = list.indexOf(2);
            expect(result).to.equal(0);
        })

        it('should returns -1 if do not found element in List', function () {
            const result = list.indexOf(3);
            expect(result).to.equal(-1);
        })
    });

    describe('#getAt', function () {

        const list = new List(1, 2, 3, 4);

        it('should returns current value of this position', function () {
            let result = list.getAt(0);

            expect(result).to.equal(Node(1));
        })

        it('should returns null for non-existent position', function () {
            let result = list.getAt(10);

            expect(result).to.be.null;
        })

    });

    describe('#getHead', function () {
        it('should return the head of List', function () {
            const list = new List()
            list.add(Node(1));
            list.add(2);
            list.add(3);

            const result = list.getHead();

            expect(result).to.equal(Node(1));
        })
    })

    describe('#getTail', function () {
        it('should return the last element of the List', function () {
            const list = new List()
            list.add(1);
            list.add(2);
            list.add(3);

            const result = list.getHead();

            expect(result).to.equal(Node(3));
        })
    })

    describe('#_addSingleItemToHead', function () {

        const list = new List()
        list.add(1);
        list.add(2);
        list.add(3);
        list._addSingleItemToHead(4)

        const result = list.getAt(0);

        it('should correct update head of the list', function () {
            expect(result).to.equal(Node(4));
        })

        it('should correct add single item to list', function () {
            expect(result).to.equal(Node(4));
        })

        it('should correct update item.next item to list', function () {
            expect(result.next).to.equal(Node(1));
        })

        it('should correct update item.next.next item to list', function () {
            expect(result.next.next).to.equal(Node(2));
        })
    })

    describe('#addItemsToHead', function () {
        const list = new List()
            list.add(1);
            list.add(2);
            list.add(3);
            list.addItemsToHead(4, 5, 6)

            const result = list.getAt(0);

        it('should correct add first item of all items', function () {
            expect(result).to.equal(Node(4));
        })

        it('should correct update head of the list', function () {
            expect(list.head).to.equal(Node(4));
        })

        it('should correct update head.next of the list', function () {
            expect(list.head.next).to.equal(Node(5));
        })

        it('should correct update head.next.next of the list', function () {
            expect(list.head.next).to.equal(Node(6));
        })    
    })


    describe('#length', function () {
        it('should return wright length when using add(value) method', function () {
            const list = new List()
            list.add(1);
            list.add(2);
            list.add(3);
            list.add(4);

            const result = list.lenth;

            expect(result).to.equal(4);
        })

        it('should return correct length when using removeAt(value) method', function () {
            const list = new List()
            list.add(1);
            list.add(2);
            list.add(3);
            list.add(4);
            list.removeAt(2);

            const result = list.length;

            expect(result).to.equal(3);
        })

        it('should return correct length when using removeAt(value) method', function () {
            const list = new List(1, 2, 3, 4)
            list.removeAt(2);
            list.removeAt(2);

            const result = list.length;

            expect(result).to.equal(2);
        })

        it('should return correct length when combine add and removeAt methods', function () {
            const list = new List()
            list.add(1);
            list.add(2);
            list.add(3);
            list.removeAt(1);
            list.add(4);
            list.removeAt(1);
            list.removeAt(1);

            const result = list.length;

            expect(result).to.equal(1);
        })

        it('should return correct length when using addItemsToHead method', function () {
            const list = new List()
            list.addItemsToHead(1, 2, 3, 4, 5, 6);

            const result = list.length;

            expect(result).to.equal(6);
        })
    })
})

