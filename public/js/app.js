console.log("Incoming...");

let eye1 = document.querySelector(".eyeball1");
let eye2 = document.querySelector(".eyeball2");
document.querySelector("#signUp").style.minHeight = window.innerHeight+"px";

function toggleClass (tag, className) {
  if (!tag.classList.contains(className)) {
    tag.classList.add(className);
    console.log(tag.className);
  } else {
    tag.classList.remove(className);
    console.log(tag.className);
  }
}

setInterval(()=> {
  toggleClass(eye1, "blinkEye");
  toggleClass(eye2, "blinkEye")
}, 5400);


/***** CLASS DECLARATION *****/


class App {
  constructor() {
    this.bars = "hello boy"
  }


  static start () {

    ui.variables.signupBtn = ui.helper().getTag("#signupBtn");
    ui.signUp();
    ui.landingPage(ui.helper().getTag("#signUpFrontBtn"), ()=> {
      ui.slideFront([ui.variables.homePage, ui.variables.signupPage], "translateX(-100%)");
    });
    ui.landingPage(ui.helper().getTag("#signInBackBtn"), ()=> {
      ui.slideBack([ui.variables.homePage, ui.variables.signinPage], "translateX(-100%)");
    });

    ui.variables.signinBtn = ui.helper().getTag("#signinBtn");
    ui.signIn();
  }
}
// END OF APP
class UI extends App {
  constructor(bars) {
    super(bars);
    this._variables = {};
  }
  set variables (val) {
    if (typeof val === "object") this._variables = val;
    else console.error("variable must be an object with `key` and `value`. try this._variables."+val+ '= "Your stored value";');
  }

  get variables () {
    return this._variables
  }
  guestVisit () {
    this.helper().getTag(".fcolor").style.transform = "scale(2.2)";
    this.helper().getTag(".scolor").style.transform = "scale(2)";
    // Animate Brand back to navbar
    this.helper().getTag(".brand").style.transform = "translate(25vw, 440%)";
    this.helper().getTag(".brand").style.fontSize = "29px";
    // move navbar to it initial stage
    this.helper().getTag(".navbar").style.transform = "translateY(-100%)";
  }
  // Slide Back
  slideBack (tag, css) {
    if (tag.__proto__.constructor.name === "HTMLElement") tag.style.transform = css;
    else if (tag.__proto__.constructor.name === "Array") {
      tag.forEach(page=> {
        console.log(page.style.transform);
        page.style.transform = css;

      });
      if (this.helper().getTag(".brand").style.transform !== "translate(25vw, 440%)" && this.helper().getTag("#guest")) this.guestVisit();
    } else console.error("Unknown Error from Slide Front Function");
    if (css) return css;
    else console.log("No given style in Slide Front Function");
  }

  // Slide Forward
  slideFront (tag, css) {
    if (tag.__proto__.constructor.name === "HTMLElement") tag.style.transform = css;
    else if (tag.__proto__.constructor.name === "Array") {
      tag.forEach(page=> {
        page.style.transform = css
      });
      if (this.helper().getTag(".brand").style.transform !== "translate(25vw, 440%)" && this.helper().getTag("#guest")) this.guestVisit();
    } else console.error("Unknown Error from Slide Front Function");
    if (css) return css;
    else console.log("No given style in Slide Front Function");
  }

  signUp () {
    this.variables.signupBtn.addEventListener("click", e => {
      this.slideBack([this.variables.homePage, this.variables.signupPage], "translateX(0%)");
      //Don't touch above code
      console.log(this.variables.homePage.__proto__.constructor.name);

      //   this.guestVisit();
      setTimeout(()=> {
        this.variables.signUpFrontBtn.style.transform = "scale(1)";

      }, 650);

    })
  }
  landingPage (btn, cb) {
    btn.addEventListener("click", e => {
      if (cb) cb();
      console.log(this.helper().getTag(".brand").style.transform);
      this.helper().getTag(".fcolor").style.transform = "scale(1)";
      this.helper().getTag(".scolor").style.transform = "scale(1)";
      // Animate Brand back to navbar
      this.helper().getTag(".brand").style.transform = "translate(0vw, 0%)";
      this.helper().getTag(".brand").style.fontSize = "25px";
      // move navbar to it initial stage
      this.helper().getTag(".navbar").style.transform = "translateY(0%)";


      this.variables.signUpFrontBtn.style.transform = "scale(0)";

      this.variables.signInBackBtn.style.transform = "scale(0)";
    });

  }

  signIn () {
    this.variables.signinBtn.addEventListener("click",
      e => {
        this.slideFront([this.variables.homePage, this.variables.signinPage], "translateX(-200%)");

        setTimeout(()=> {
          this.variables.signInBackBtn.style.transform = "scale(1)";
        }, 650);

      })

  }

  helper () {
    function getTag (val) {
      if (val !== "") return document.querySelector(val);
      else console.log(" you can't ...querySelector("+val+") 'cus it's empty");
    }
    function toggleClass (tag, className) {
      if (!tag.classList.contains(className)) {
        tag.classList.add(className);
        console.log(tag.className);
      } else {
        tag.classList.remove(className);
        console.log(tag.className);
      }
    }
    function rmClass (tagN, clas) {
      const tag = ui.helper().getTag(tagN);

      if (typeof tag !== "string" && typeof clas === "string")  tag.classList.remove(clas);
      else if (typeof clas === "undefined") console.info("Here are the available classes in "+tagN+": "+ tag.className);
      else console.error("Can't remove class "+clas+" from: "+tagN)
      return console.log(tag)
    }
    return {
      getTag,
      toggleClass,
      rmClass
    }
  }

}
// END OF UI

const app = new App();
const ui = new UI();
ui.variables.signUpFrontBtn = ui.helper().getTag("#signUpFrontBtn")
ui.variables.signInBackBtn = ui.helper().getTag("#signInBackBtn");

App.start();


ui.variables.homePage = ui.helper().getTag("#home");
ui.variables.signupPage = ui.helper().getTag("#signUp");
ui.variables.signinPage = ui.helper().getTag("#signIn");