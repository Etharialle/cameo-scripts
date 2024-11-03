// Sample JSON data representing elements (blocks) to create
var jsonData = '[{"name": "Block1"}, {"name": "Block2"}, {"name": "Block3"}]';

// Parse the JSON data
var elementsArray = JSON.parse(jsonData);

// Get project and elements factory
var project = com.nomagic.magicdraw.core.Application.getInstance().getProject();
var elementsFactory = project.getElementsFactory();
var model = project.getModel(); // Get the root model element

// Function to find the owner element by name
function findElementByName(name) {
    var ownedElements = model.getOwnedElement().toArray();
    for (var i = 0; i < ownedElements.length; i++) {
        var element = ownedElements[i];
        if (element instanceof com.nomagic.uml2.ext.magicdraw.classes.mdkernel.NamedElement &&
            element.getName() === name) {
            return element;
        }
    }
    return null; // Return null if the element is not found
}

// Function to create a new block under the specified owner
function createBlock(name, owner) {
    var block = elementsFactory.createClassInstance(); // Using createClassInstance as a substitute for Block
    if (block instanceof com.nomagic.uml2.ext.magicdraw.classes.mdkernel.NamedElement) {
        block.setName(name); // Set the block's name
        owner.addOwnedElement(block); // Add the block as owned by the specified owner
        print("Created new block: " + name + " under owner: " + owner.getName());
    } else {
        print("Created element is not a NamedElement and cannot have a name.");
    }
    return block;
}

// Main script logic
var ownerName = "Scripts"; // The name of the owner
var ownerElement = findElementByName(ownerName); // Find the owner element

if (ownerElement === null) {
    print("No owner found with name '" + ownerName + "'.");
} else {
    // Loop through the parsed JSON array and create blocks
    for (var i = 0; i < elementsArray.length; i++) {
        var elementData = elementsArray[i];
        createBlock(elementData.name, ownerElement);
    }
}