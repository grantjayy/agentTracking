var call_type;
var url = "http://app.maximentoring.com/schedule";

if (!button) {
  var button = ".button-42";
}

const landing_trackng = () => {
  const queryString = window.location.search;
  const url = window.location.href;
  const urlParams = new URLSearchParams(queryString);

  let data = { url: url };
  urlParams.forEach((value, key) => (data[key] = value));

  $.ajax({
    type: "POST",
    url: "http://app.maximentoring.com/page-land/",
    data: JSON.stringify({ data: data }),
    dataType: "text",
    contentType: "application/json; charset=utf-8",
  });
};

function set_tracking_cookie(queryParam, value) {
  if (value) {
    if (
      Cookies.get(queryParam) == null ||
      Cookies.get(queryParam) == "" ||
      Cookies.get(queryParam) == "null"
    ) {
      Cookies.set(queryParam, value, { expires: 180, path: "/" });
    }
  }
}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results == null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function get_tracking_cookies() {
  let params = new URLSearchParams({});
  if (Cookies.get("a")) {
    params.append("a", Cookies.get("a"));
  }
  if (Cookies.get("utm_source")) {
    params.append("utm_source", Cookies.get("utm_source"));
  }
  if (Cookies.get("utm_medium")) {
    params.append("utm_medium", Cookies.get("utm_medium"));
  }
  if (Cookies.get("utm_campaign")) {
    params.append("utm_campaign", Cookies.get("utm_campaign"));
  }
  if (Cookies.get("utm_content")) {
    params.append("utm_content", Cookies.get("utm_content"));
  }
  if (Cookies.get("agent_id")) {
    params.append("agent_id", Cookies.get("agent_id"));
  }
  if (Cookies.get("email")) {
    params.append("email", Cookies.get("email"));
  }
  if (Cookies.get("name")) {
    params.append("name", Cookies.get("name"));
  }
  if (Cookies.get("phone")) {
    params.append("phone", Cookies.get("phone"));
  }
  return params;
}

function schedule(obj) {
  const params = get_tracking_cookies();
  url += `?ct=${call_type}&${params}`;
  window.location.href = url;
}

$().ready(function () {
  landing_trackng();
  var agent = getParameterByName("a");
  var source = getParameterByName("utm_source");
  var medium = getParameterByName("utm_medium");
  var campaign = getParameterByName("utm_campaign");
  var content = getParameterByName("utm_content");
  var agent_id = getParameterByName("agent_id");
  var email = getParameterByName("email");
  var name = getParameterByName("name");
  var phone = getParameterByName("phone");

  set_tracking_cookie("a", agent);
  set_tracking_cookie("utm_source", source);
  set_tracking_cookie("utm_medium", medium);
  set_tracking_cookie("utm_campaign", campaign);
  set_tracking_cookie("utm_content", content);
  set_tracking_cookie("agent_id", agent_id);
  set_tracking_cookie("email", email);
  set_tracking_cookie("name", name);
  set_tracking_cookie("phone", phone);

  if (call_type) {
    $(button).click(schedule);
  }
});
