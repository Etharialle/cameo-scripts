// Sample JSON object representing elements (blocks) to create
var jsonData = '[{"name": "Block1"}, {"name": "Block2"}, {"name": "Block3"}]';

// Parse the JSON data
var elementsArray = JSON.parse(jsonData);

// Get project and elements factory
var project = com.nomagic.magicdraw.core.Application.getInstance().getProject();
var elementsFactory = project.getElementsFactory();
var model = project.getModel(); // Get the root model element

// Find the owner element by name
function findElementByName(name) {
    var ownedElements = model.getOwnedElement().toArray();
    for (var i = 0; i < ownedElements.length; i++) {
        if (ownedElements[i].getName() === name) {
            return ownedElements[i];
        }
    }
    return null; // Return null if not found
}

// Function to create a new block under the specified owner
function createBlock(name, owner) {
    var block = elementsFactory.createBlockInstance(); // Create a new Block instance
    block.setName(name); // Set the name of the block
    owner.addOwnedElement(block); // Add the block as owned by the specified owner
    print("Created new block: " + name + " under owner: " + owner.getName());
    return block;
}

// Main script logic
var ownerName = "Aures Topics"; // The name of the owner
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
