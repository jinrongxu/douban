define([
	"mui", "jsonp"
], function(mui) {
	//获取jiedian
	(function() {
		var $ = function(str) {
			return document.querySelector(str)
		}
		return window.$ = $;
	})()
	var url = "https://api.douban.com/v2/movie/in_theaters";
	var start = 0,
		count = 10

	function init() {
		mui.init({
			pullRefresh: {
				container: '#pullrefresh',
				// 		     down: {
				// 		callback: pulldownRefresh
				// 					},
				up: {
					contentrefresh: '正在加载...',
					callback: getList
				}
			},
		});
		getList();
		tab();
		search();

	};

	//初始页面
	function getList() {
		setTimeout(function() {

			// mui('#pullrefresh').pullRefresh().endPullupToRefresh(false)
			mui.getJSONP(url, {
				start: start++, //数据的开始项
				count: count, // 单页条数  
				city: "北京" // 城市
			}, function(res) {
				render(res.subjects)
			});
		}, 1500)

	};

	function search() {
		$("#search").addEventListener("input", function() {
			url = "http://api.douban.com/v2/movie/search";
			mui.getJSONP(url, {
				start: 1, //数据的开始项
				count: 10, // 单页条数
				q: this.value // 城市
			}, function(res) {
				render(res.subjects)
			});
		})
	}
	//tab切换
	function tab() {
		var lis = [...document.querySelectorAll(".tab li")];
		lis.forEach((item) => {
			item.addEventListener("tap", function() {
				if (this.classList.contains("active")) {
					return;
				}
				for (var i = 0; i < lis.length; i++) {
					lis[i].classList.remove("active")
				}
				this.classList.add("active");
				if (this.getAttribute("data-index") == 1) {
					url = "https://api.douban.com/v2/movie/in_theaters"
					getList()
				} else if (this.getAttribute("data-index") == 2) {
					url = "https://api.douban.com/v2/movie/coming_soon"
					getList()
				} else {
					url = "http://api.douban.com/v2/movie/top250";
					getList();
				}
			});

		})
	}
	//渲染
	function render(data) {
		$(".pullList").innerHTML = data.map(item => {
			var sub = item.directors.map(item => {
				return `${item.name}`
			}).join("、");
			var actor = item.casts.map(item => {
				return `${item.name}`
			}).join("、")
			return `
					<div class="content">
					<dl data-id="${item.id}">
								<dt>
									<img src="${item.images.large}" >
								</dt>
								<dd>
									<p>作品:${item.title}</p>
									<p>类型:${item.genres}</p>
									<p>导演:${sub?sub:"无"}</p>
									<p>演员:${actor?actor:"无"}</p>
									<p>年份:${item.year}</p>
								</dd>
								<div class="average">
									<span>${item.rating.average}</span>
								</div>
							</dl>
							</div>`
		}).join("")
	}
	init()
});
