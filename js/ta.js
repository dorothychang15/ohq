var headerHtml = '<div class="row">' +
    '<div class="col-md-3 text-center" id="clearStud">clear <br> students</div>' +
    '<div class="col-md-6 text-center" id="ohq"><div id="ohq">OHQ</div><div id="tagline">OFFICE HOURS QUEUE</div></div>' +
    '<div class="col-md-1 text-center" id="numTaText"><span id="minusTa">-</span><span id="numTa"></span><span id="plusTa">+</span><br> TA\'S ON DUTY</div>' +
    '<div class="col-md-2"></div>' +
    '</div>';

var tableHtml = '<table class="table borderless" cellspacing="5px">' +
    '<thead><tr>' +
    '<th>Student</th>' +
    '<th>Category</th>' +
    '<th>Issue</th>' +
    '<th>Wait time</th>' +
    '<th>Status</th>' +
    '</tr></thead>' +
    '<tbody id="queueElem"></tbody>' +
    '</table>'

$(function() {
    $("#ta-password").submit(function() {
        var answer = $("#password-input").val();
        var hash = sjcl.hash.sha256.hash(answer).toString();
        var pword = "-2091858537,-2134294547,1325024883,1078991922," +
            "-399792425,-272296192,-752711352,-2011847339";
        if (hash === pword) {
            var $main = $("#main");
            $main.html(headerHtml);
            $main.append(tableHtml);
        }
        return false;
    });
});
