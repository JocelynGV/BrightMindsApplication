class myNavbar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <style>
    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }
    /* Hide default HTML checkbox */
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    /* The slider */
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: .4s;
      transition: .4s;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }
    input:checked + .slider {
      background-color: #2196F3;
    }
    input:focus + .slider {
      box-shadow: 0 0 1px #2196F3;
    }
    input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
    /* Rounded sliders */
    .slider.round {
      border-radius: 34px;
    }
    .slider.round:before {
      border-radius: 50%;
    }
    #switch-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      margin-left: 40px;
    }
    </style>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" style="background-color: #e3f2fd;">
        <a class="navbar-brand" href="/homepage">
            <img src="assets/lightbulb.png" width="30" height="30" class="d-inline-block align-top" alt="">
            Bright Minds
          </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Subjects
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="/homepage">Math</a>
                <a class="dropdown-item" href="#">English</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
            <li class="nav-item">
              <a id="create-link" class="nav-link disabled" href="/create">Create</a>
            </li>
          </ul>
          <div id="switch-container">
            <label for="toggle-switch">I am a Parent/Teacher</label>

          <label class="switch">
            <input type="checkbox" id="toggle-switch">
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </nav>
    `;

    this.toggleDisabledLink = this.toggleDisabledLink.bind(this);  // Bind method to custom element context
    this.querySelector('#toggle-switch').addEventListener('change', this.toggleDisabledLink);
  }

  // Toggle the 'disabled' class for the 'create-link' element
  toggleDisabledLink(event) {
    const link = this.querySelector('#create-link');
    if (event.target.checked) {
      link.classList.remove('disabled');
    } else {
      link.classList.add('disabled');
    }
     // Dispatch a custom event
     this.dispatchEvent(new CustomEvent('toggle-switch-changed', {
      detail: { checked: event.target.checked }
    }));
  }
}

customElements.define("my-navbar", myNavbar);