let timeModal;

// Закрытие модалок
function сloseModals(modal) {
  clearTimeout(timeModal);
  $(modal).removeClass("opened");
  clearTimeout(timeModal);
  timeModal = setTimeout(() => {
    $(modal).removeClass("!flex");
  }, 400);
}

const setModalsClose = (modal) => {
  $(modal).on("click", function () {
    сloseModals(modal);
  });

  $(modal)
    .find(".modal__container")
    .on("click", function (e) {
      e.stopPropagation();
    });

  $(modal)
    .find(".modal__close")
    .on("click", function (e) {
      e.preventDefault();
      сloseModals(modal);
    });
};

// Открытие модалок

const openModal = (modal, text, title, icon) => {
  $(modal).addClass("!flex");
  clearTimeout(timeModal);
  if (text) {
    $(modal).find(".form_insert-text").html();
    $(modal).find(".form_insert-text").html(text);
  }

  if(title){
    $(modal).find(".form_insert-title").html();
    $(modal).find(".form_insert-title").html(title);
  }

  if(!icon) {
    $(modal).find(".form_insert-icon").remove();
  }

  timeModal = setTimeout(() => {
    $(modal).addClass("opened");
  }, 100);
};

// Модалки

const setModal = () => {
  $("[data-modal]").each((_, el) => {
    const modal = $(el).data("modal");
    $(el).on("click", function (e) {
      e.preventDefault();
      openModal(modal);
    });

    setModalsClose(modal);
  });
};

function insertFormAnims() {
  $(".input__item").each(function () {
    $(this).off("focus");
    $(this).off("blur");
  });
  if ($(".input").length > 0) {
    function inputOnClick(el) {
      el.addClass("active");
    }

    function setInputs(el) {
      if (el.find(".input__item").val().trim().length < 1) {
        el.removeClass("active");
      } else {
        inputOnClick(el);
        if (el.hasClass("passwordaccess")) {
          if (
            el.prev().find(".input__item").val() !==
            el.find(".input__item").val()
          ) {
            el.addClass("error");
            el.append(
              `<span class="absolute text-error text-errorColor" style="top: calc(100% + 6px); right: 0; ">Пароли должны совбадать</span>`
            );
          } else {
            el.removeClass("error");
            el.find(".text-error").remove();
          }
        }
      }
    }

    let inp = $(".input");

    inp.each(function () {
      const $this = $(this);
      setInputs($this);

      $this.find(".input__item").on("focus", function () {
        inputOnClick($this);
      });

      $this.find(".input__item").on("blur", function () {
        setInputs($this);
      });
    });
  }
}

function setForms() {
  insertFormAnims();
  var target = document.querySelector("form");

  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      insertFormAnims();
    });
  });

  var config = { attributes: true, childList: true, characterData: true };

  observer.observe(target, config);
}

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const headerOffset = header.offsetHeight;
  // SIDE MENU
  const sideMenuToggle = document.querySelector(".sidemenu__toggleButton");
  const sideMenu = document.querySelector(".sidemenu");

  const productCategory = new Swiper(".product-category .swiper", {
    slidesPerView: 3,
    spaceBetween: 21,
    pagination: {
      el: ".swiper-controls .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-controls .swiper-button-next",
      prevEl: ".swiper-controls .swiper-button-prev",
    },
  });

  if (sideMenuToggle) {
    sideMenuToggle.addEventListener("click", function () {
      sideMenu.classList.toggle("active");
    });
  }

  // ANCHORS
  const anchors = document.querySelectorAll(".anchor a");
  const anchorsSec = document.querySelectorAll(".anch-sec");
  const setActiveLink = (id) => {
    anchors.forEach((link) => {
      link.parentNode.classList.remove("active");
      if (link.getAttribute("href").slice(1) === id) {
        link.parentNode.classList.add("active");
      }
    });
  };

  const setActiveAnchor = () => {
    anchorsSec.forEach((el, i) => {
      const top = window.scrollY;
      const offset = el.offsetTop - headerOffset;
      const height = el.offsetHeight - headerOffset;
      let id = el.getAttribute("id");

      if (top > offset && top < offset + height) {
        setActiveLink(id);
      } else if (i === 0 && top < offset) {
        setActiveLink(id);
      } else if (
        i === anchorsSec.length - 1 &&
        top < offset &&
        top >
          anchorsSec[i - 1].offsetTop +
            anchorsSec[i - 1].offsetHeight -
            2 * headerOffset
      ) {
        setActiveLink(id);
      }
    });
  };

  if (anchors.length > 0) {
    anchors.forEach((el) => {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.getElementById(
          el.getAttribute("href").slice(1)
        ).offsetTop;
        window.scrollTo({
          top: target - headerOffset + 10,
          left: 0,
          behavior: "smooth",
        });
      });
    });
    window.onload = setActiveAnchor;
    window.onscroll = setActiveAnchor;
  }

  // FORMS

  if ($("form").length > 0) {
    setForms();
  }

  // MODALs
  setModalsClose("#formSuccess");
  setModal();
  // TIP

  const tip = document.querySelector(".tips__close");

  if (tip) {
    tip.addEventListener("click", function () {
      this.parentNode.classList.remove("active");
    });
  }
});
