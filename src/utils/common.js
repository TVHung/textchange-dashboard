//format value
export const formatPrice = (num) => {
  const n = String(num),
    p = n.indexOf(".");
  return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, (m, i) =>
    p < 0 || i < p ? `${m}.` : m
  );
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const handleCalculateTime = (time) => {
  if (time) {
    let createAt = new Date(time).getTime();
    let current = new Date().getTime();
    let distance = current - createAt;
    if (distance <= 0) return "";
    else {
      let years = Math.floor(distance / (365 * 24 * 3600 * 1000));
      let months = Math.floor(distance / (30 * 24 * 3600 * 1000));
      let days = Math.floor(distance / (24 * 3600 * 1000));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (years > 0) return `${years} năm trước`;
      else if (months > 0 && months < 12) return `${months} tháng trước`;
      else if (days > 7 && days < 31)
        return `${Math.floor(days / 7)} tuần trước`;
      else if (days > 0 && days < 7) return `${days} ngày trước`;
      else if (hours > 0 && hours < 24) return `${hours} giờ trước`;
      else if (minutes > 0 && minutes < 60) return `${minutes} phút trước`;
      else if (seconds > 0 && seconds < 60) return "Vừa xong";
      else return "";
    }
  }
  return "";
};

export const insertParam = (key, value) => {
  key = encodeURIComponent(key);
  value = encodeURIComponent(value);

  // kvp looks like ['key1=value1', 'key2=value2', ...]
  var kvp = document.location.search.substr(1).split("&");
  let i = 0;

  for (; i < kvp.length; i++) {
    if (kvp[i].startsWith(key + "=")) {
      let pair = kvp[i].split("=");
      pair[1] = value;
      kvp[i] = pair.join("=");
      break;
    }
  }

  if (i >= kvp.length) {
    kvp[kvp.length] = [key, value].join("=");
  }

  // can return this or...
  let params = kvp.join("&");
  return params;
};

export const deleteParam = (parameter) => {
  var url = document.location.href;
  var urlparts = url.split("?");

  if (urlparts.length >= 2) {
    var urlBase = urlparts.shift();
    var queryString = urlparts.join("?");

    var prefix = encodeURIComponent(parameter) + "=";
    var pars = queryString.split(/[&;]/g);
    for (var i = pars.length; i-- > 0; )
      if (pars[i].lastIndexOf(prefix, 0) !== -1) pars.splice(i, 1);
    url = urlBase + "?" + pars.join("&");
    window.history.pushState("", document.title, url); // added this line to push the new url directly to url bar .
  }
};

export const getParam = (feild) => {
  var url = new URL(window.location.href);
  var paramString = url.searchParams.get(feild);
  return paramString;
};
