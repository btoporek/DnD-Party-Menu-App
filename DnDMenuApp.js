// MENU DRIVEN APP FOR ADD PARTIES AND CHARACTERS IN D&D
/* Elements that we need:
-DnD party: name of party and insert characters into party
-Characters (AKA Adventurers): race and class 
-Need to create, view and delete elements
*/

class Character {
  //character class with their name and race
  constructor(name, race) {
    this.name = name;
    this.race = race; // Examples: Dragonborn, Dwarf, Elf, etc.
  }

  describe() {
    // describe method to print out info about characters
    return `${this.name} is of the ${this.race} race.`; // Ex: Mike is of the Dwarf race.
  }
}

class Party {
  // class for DnD party and includes party name with characters inserted into empty array by user
  constructor(name) {
    this.name = name;
    this.characters = [];
  }
  addCharacter(character) {
    //method to add character
    if (character instanceof Character) {
      // checks if character is instance of character class
      this.character.push(character); //pushs characters to empty character array
    } else {
      // exception made for error message if inputting character incorrectly
      throw new Error(`Argument is not a character: ${character}.`);
    }
  }
  describe() {
    //prints out name of DnD party and characters on it
    return `The adventurers, known as ${this.name}, have ${this.character.length} characters in their party.`;
  }
}

class Menu {
  // class for menu options (the pop up window to make choices for what to do)
  constructor() {
    this.party = []; // opens empty array to add party
    this.selectedParty = null; // null because when you start no party are selected
  }

  start() {
    // starts menu application
    let selection = this.showMainMenuOptions(); // show Menu options when user has selected something
    // at this point methods are being referenced that are not yet made until after we've set up the structure of what we want to happen
    while (selection != 0) {
      // these options determine what happens in the menu based on user choice
      // as long as the user hasn't selected 0, do the following:
      switch (selection) {
        case "1":
          this.createParty();
          break;
        case "2":
          this.viewParty();
          break;
        case "3":
          this.deleteParty();
          break;
        case "4":
          this.displayParties();
          break;
        default:
          alert("Critical Failure: Roll again to select thine option.");
      }
      selection = this.showMainMenuOptions(); // calls the function to run the menu for the user to select their options
    }

    alert("Fairwell Adventurers!"); // this pops up when user exits the menu application (i.e. selecting 0 to exit as seen below)
  }

  showMainMenuOptions() {
    //displays pop up box of their choices for above switch statement
    return prompt(`
            0) Depart
            1) Create new party
            2) View party
            3) Delete party
            4) Display all parties
        `);
  }

  showPartyMenuOptions(partyInfo) {
    //displays pop up box of choices when user selects 'View party'
    return prompt(`
        0) Go back
        1) Create adventurer
        2) Delete adventurer
        -------------------------
        ${partyInfo} 
        `); // displays party info currently passed in array
  }

  displayParties() {
    // function made to display the parties created by the user
    let partyString = ""; // creates blank string
    for (let i = 0; i < this.party.length; i++) {
      //
      // iterate through parties and grab each one
      partyString += i + ") " + this.party[i].name + "\n";
      //example displayed as '0) my party' and then adds a new line for each display
    }
    alert(partyString); // so we can see all the parties
  }

  createParty() {
    // function to prompt user to enter the name of the party they are creating
    let name = prompt("What shall thy party be called?"); // prompt message
    this.party.push(new Party(name)); // pushes the user entered name into the parties array
  }

  viewParty() {
    // function to view the party and its details
    //see the specifics of a certain party
    let index = prompt("What index does thy party belong to?"); // prompt message for user
    if (index > -1 && index < this.party.length) {
      // loops starting at 0 and includes the limit of the length of parties listed
      this.selectedParty = this.party[index]; // connects the index number to the selected party
      let description =
        "Thy party is known as: " + this.selectedParty.name + "\n"; // displays the party's name and adds a new line for each
      // this for loop collects the descriptions of all the characters added to a party by the user
      for (let i = 0; i < this.selectedParty.characters.length; i++) {
        description +=
          i +
          ") " + // displays index number like this: 0)
          this.selectedParty.characters[i].name + // collects the character name
          " - " + // adds a dash between character name and character position
          this.selectedParty.characters[i].race + // collects the character race
          "\n"; // adds a new line before looping and collecting the next one
      } // example: 0) Miko - Elf

      let selection = this.showPartyMenuOptions(description); // this method will display the parties show the options for the party
      switch (
        selection // this is a sub menu that pops up allowing user to create or delete characters
      ) {
        case "1":
          this.createCharacter();
          break;
        case "2":
          this.deleteCharacter();
      }
    }
  }

  deleteParty() {
    // sets up method for deleting a party
    let index = prompt("What index of thy party do you wish to banish?"); //pops up message to user asking for user input
    if (index > -1 && index < this.party.length) {
      // conditions for user to enter index location to delete party (starting with 0 and going up to index of parties listed by user)
      this.party.splice(index, 1); // deletes the user selected index of party to delete
    }
  }

  createCharacter() {
    // sets up method to create a character
    let name = prompt("What shall thy adventurer be called?"); // prompts user to enter name of new character
    let race = prompt("What race does thine belong to?"); // prompts user to enter race of new character
    this.selectedParty.characters.push(new Character(name, race)); // pushes the above input from user into array
  }

  deleteCharacter() {
    // sets up method for deleting character
    let index = prompt("What index of thy adventurer do you wish to banish?"); // prompts user to enter the index of character to delete
    if (index > -1 && index < this.selectedParty.characters.length) {
      // conditions for user to enter index location of character (stars at 0 and goes up to whatever index length of characters is currently listed)
      this.selectedParty.characters.splice(index, 1); // deletes the user selected index of character to delete
    }
  }
}

let menu = new Menu();
menu.start(); // calls the method to start the menu application
