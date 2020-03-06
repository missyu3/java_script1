// DOMの読み込みが終わったらfunction()の中の処理を実行します。
$(document).ready(function(){
    // [国語の点数,英語の点数,数学の点数,理科の点数,社会の点数]の入力値を取得して合計点と平均点を出すロジックを作ります。

    function score_indicate(arg_subject_points){

      let subject_points = arg_subject_points
      let sum = 0
      for (let i = 0; i < subject_points.length; i++ ) {
        sum = sum + subject_points[ i ]
      }
      $("#sum_indicate").text(sum);

      let average = 0
      average = sum / (subject_points.length)
      $("#average_indicate").text(average);
    };

    function get_subject_points(){
        let subject_points = [Number($('#national_language').val()),
        Number($('#english').val()),
        Number($('#mathematics').val()),
        Number($('#science').val()),
        Number($('#society').val())
        ];
    return subject_points
    }


    // 平均点数を取得し、取得した平均点数からランク分け("A", "B", "C", "D")をするロジックを作ります。
    function get_achievement(){
      let averageIndicate = $("#average_indicate").text();
      if ( averageIndicate >= 80){
        return "A";
      } else if (averageIndicate >= 60){
          return "B";
      } else if (averageIndicate >= 40){
          return "C";
      }else {
        return "D";
      }
    };

    // 判定を返します。
    function get_pass_or_failure(subject_points){
      let number = subject_points
      for (var i = 0; i < number.length; i++){
        if (number[ i ] < 60){
            return "不合格"
        }
      }
      return "合格"
    };
    // 最終的なジャッジのロジックを作ります。
    function judgement(){
      let subject_points = get_subject_points();
      let achievement = get_achievement();
      let pass_or_failure = get_pass_or_failure(subject_points);
      $('#declaration').empty();
      $('#declaration').append(`<label id="alert-indicate" class="alert alert-info">あなたの成績は${achievement}で${pass_or_failure}です</label>`);
    };

    // [国語の点数,英語の点数,数学の点数,理科の点数,社会の点数]のいずれかの点数が変更された際に「function score_indicate()」を発火させる処理です。
    $('#national_language, #english, #mathematics, #science, #society').change(function() {
        let subject_points = get_subject_points();
        score_indicate(subject_points);
    });
    // 「ランク」(class="evaluation")ボタンを押したら「get_achievement()」が出力される処理です。
    $('#btn-evaluation').click(function() {
      $("#evaluation").text(get_achievement());
    });
    // 「判定」(class="btn-judge")ボタンを押したら「function et_pass_or_failure()」が出力される処理です。
    $('#btn-judge').click(function() {
        let subject_points = get_subject_points();
        let result = get_pass_or_failure(subject_points);
        $("#judge").text(result);
    });
    // 「最終ジャッジ」(class="btn-declaration")ボタンを押したら「function judgement()」が出力される処理です。
    $('#btn-declaration').click(function() {
        judgement();
    });
  });