$(function () {
	// 메인화면 swiper
	if ($(".main_slide_wrapper").length) {
		var swiper = new Swiper(".main_slide_container", {
			slidesPerView: 1,
			spaceBetween: 25,
			width: 270,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
		});
	}

	// home swiper
	if ($(".categories_slide").length) {
		$(".category_menus").slick({
			dots: false,
			infinite: false,
			speed: 300,
			slidesToShow: 1,
			centerMode: false,
			variableWidth: true,
			arrows:false,
		});
	}

	// Details swiper
	if ($(".product_thumb_slides").length) {
		var detailSwiper = new Swiper(".product_thumb_container", {
			slidesPerView: 2.5,
			spaceBetween: 13,
		});

		// 이미지 변경하기
		let thumbImg = $('.product_thumb_slides li img');
		let targetImg = $('.product_img_top img');

		thumbImg.click(function () {
			let targetImgUrl = $(this).attr('src');
			targetImg.attr('src', targetImgUrl);
		});
	}

	// history 뒤로 가기
	$(".go_back").click(function (e) {
		e.preventDefault();

		if (window.history.length > 1) {
			window.history.back();
		} else {
			location.href = "./index.html";
		}
	});

	//Aside Menu
	if ($(".aside_menu_toggle").length) {
		let asideToggleBtn = $(".aside_menu_toggle");
		asideToggleBtn.click(function () {
			$("body").toggleClass("aside_active");
			asideToggleBtn.attr("background-position", "-354px -582px");
		});

		// Aside Menu Accordion
		let asideMenuList = $(".categories > li");

		asideMenuList.click(function () {
			$(this).find("ul").slideToggle();
			$(this).siblings("li").find("ul").slideUp();
		});
	}

	// 상세페이지 별점
	if ($('.review_content').length) {
		let rating = $('.review_content li .rating');

		rating.each(function () {
			let startScore = $(this).attr('data-rate');
			$(this).find('svg:nth-child(-n+' + startScore + ')').css({
				color: '#f05522'
			});
		});
	};

	// 장바구니 합계
	if ($('.cart_list').length) {
		let cartList = $(".cart_list li"),
			targetTotal = $(".total_price .price"),
			shippingCost = parseInt($(".shipping .price").text().replace("$ ", "")),
			totalPrice = 0,
			itemDelBtn = cartList.find(".cart_item_del");

		calcTotal();

		// $('.qty input').change(function () {
		// 	calcTotal();
		// });   ↓↓ 축약
		$(".qty input").change(calcTotal);

		itemDelBtn.click(function () {
			let userAction = confirm("Are you sure you want to delete this product?")

			if (userAction) {
				$(this).parent().remove();
				calcTotal();
			}
		});

		function calcTotal() {

			cartList = $('.cart_list li');
			totalPrice = 0;

			if (cartList.length > 0) {
				cartList.each(function () {
					let unitPrice = parseInt(
						$(this).find(".unit_price").text().replace("$ ", "")
					);
					let unitCount = $(this).find("input").val();

					totalPrice += unitPrice * unitCount;
					let subtotal = (totalPrice + shippingCost).toLocaleString('en');
					let grandTotal = subtotal;

					targetTotal.text('$ ' + grandTotal + '.00');
				});
			} else {
				targetTotal.text("$ 0.00");
			}

		}
	}

	// 검색
});