<?php
//including the database connection file
include_once("../../php/config/configbd.php");
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$stmt = mysqli_prepare($mysqli, "SELECT * FROM grupos_artistas WHERE grupos_artistas_id = ?");
mysqli_stmt_bind_param($stmt, 's', $_GET['id']);

/* execute query */
mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
$youtube_video = str_replace("https://www.youtube.com/watch?", "", $row["url_playlist_youtube"]);
$tmp = [];
$youtube_video_array=explode( "&", $youtube_video);
for ($i = 0; $i < sizeof($youtube_video_array); $i++) {
    $tmp = explode("=", $youtube_video_array[$i]);
    if ($tmp[0]== "v"){
    $youtube_video=$tmp[1];
    }
}
?>
<html class="desktop mbr-site-loaded">

<head>
    <!-- Site made with Mobirise Website Builder v5.0.2, https://mobirise.com -->
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="generator" content="Mobirise v5.0.2, mobirise.com">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
    <link rel="shortcut icon" href="/assets/images/escuela/favicon.png" type="image/x-icon">
    <meta name="description" content="Página Web Escuela Sindical María Cano">

    <!--  Essential META Tags -->
    <meta property="og:title" content="Escuela Sindical María Cano. Cultura y música proletaria: <? echo $row["nombre"]?>" />
    <meta property="og:image" itemprop="image"
        content="https://img.youtube.com/vi/<? echo $youtube_video?>/0.jpg" />
    <meta property="og:video" content="https://www.youtube.com/embed/<? echo $youtube_video?>" />
    <meta property="og:type" content="website" />
    <meta property="og:video:type" content="text/html">
    <meta property="og:video:width" content="1280">
    <meta property="og:video:height" content="720">
    
    <meta property="og:url" content="http://escuelamariacano.com/info/musica/obtener.php?id=<? echo $row["grupos_artistas_id"]?>" />
    
    <meta name="twitter:card" content="summary_large_image" />


    <title>Cultura y música proletaria.<? echo $row["nombre"]?></title>
    <link rel="stylesheet" href="/assets/mdb/css/mdb.min.css" type="text/css" />
    <link rel="stylesheet" href="/assets/web/assets/mobirise-icons/mobirise-icons.css">
    <link rel="stylesheet" href="/assets/web/assets/mobirise-icons2/mobirise2.css">
    <link rel="stylesheet" href="/assets/tether/tether.min.css">
    <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap-grid.min.css">
    <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap-reboot.min.css">
    <link rel="stylesheet" href="/assets/dropdown/css/style.css">
    <link rel="stylesheet" href="/assets/as-pie-progress/css/progress.min.css">
    <link rel="stylesheet" href="/assets/formstyler/jquery.formstyler.css">
    <link rel="stylesheet" href="/assets/formstyler/jquery.formstyler.theme.css">
    <link rel="stylesheet" href="/assets/datepicker/jquery.datetimepicker.min.css">
    <link rel="stylesheet" href="/assets/socicon/css/styles.css">
    <link rel="stylesheet" href="/assets/theme/css/style.css">
    <link rel="stylesheet" href="/assets/mobirise/css/mbr-additional_azul.css" type="text/css">
    <link rel="preload" as="style" href="/assets/mobirise/css/mbr-additional.css">
    <link rel="preload" as="style" href="/assets/mobirise/css/mbr-additional2.css">
    <link rel="stylesheet" href="/assets/mobirise/css/mbr-additional.css" type="text/css">
    <link rel="stylesheet" href="/assets/mobirise/css/mbr-additional2.css" type="text/css">
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-YLXY8YS05F"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'G-YLXY8YS05F');
    </script>
    <style>
        .video-container {
            position: relative;
            padding-bottom: 56.25%;
            padding-top: 30px;
            height: 0;
            overflow: hidden;
        }
        
        .video-container iframe,
        .video-container object,
        .video-container embed {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        
        .embed-container {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
            max-width: 100%;
        }
        
        .embed-container iframe,
        .embed-container object,
        .embed-container embed {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    </style>
</head>

<body class="clickup-chrome-ext_installed" cz-shortcut-listen="true">
    <section class="menu cid-s1YLZwONfz" once="menu" id="menuInicio">

        <nav class="navbar navbar-dropdown navbar-fixed-top navbar-expand-lg navbar-short">
            <div class="container">
                <div class="navbar-brand col-10 col-md-10 col-lg-6">
                    <div class="navbar-caption-wrap">
                        <a href="/" class="pr-1">
                            <img src="/assets/images/escuela/logoOvalletrasblancas.png" width="60px">
                        </a>
                        <div class="navbar-caption-wrap d-flex flex-column">
                            <div>
                                <a class="navbar-caption text-white display-5" href="/">Escuela Sindical María Cano</a>
                            </div>
                            <div>
                                <a class="navbar-caption text-white display-4" href="/">Por un Sindicalismo
                                    Independiente y de Nuevo Tipo</a>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <div class="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav nav-dropdown" data-app-modern-menu="true">
                        <li class="nav-item">
                            <a class="nav-link link text-white display-4" href="/cursos_y_eventos/index.html">Cursos y
                                Eventos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link link text-white display-4" href="/info/movimiento_sindical/informacion_sindical.html">Información
                                Sindical</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link link text-white display-4" href="/info/orientacion_politica_y_legal.html">Orientación Política y Legal</a>
                        </li>
                    </ul>
                    <div class="icons-menu">
                        <a href="https://twitter.com/sindicalismoin" target="_blank">
                            <span class="p-2 mbr-iconfont socicon-twitter socicon"></span>
                        </a>
                        <a href="https://www.facebook.com/esmariacano" target="_blank">
                            <span class="p-2 mbr-iconfont socicon-facebook socicon"></span>
                        </a>
                        <a href="https://www.youtube.com/channel/UCUyhp-UC-oXsMzFWFJWD4aQ" target="_blank">
                            <span class="p-2 mbr-iconfont socicon-youtube socicon"></span>
                        </a>
                        <a href="https://www.twitch.tv/sindicalismoindependiente" target="_blank">
                            <span class="p-2 mbr-iconfont socicon-twitch socicon"></span>
                        </a>
                    </div>
                    <div class="navbar-buttons mbr-section-btn">
                        <a class="btn btn-sm btn-primary-outline display-4" target="_blank" href="https://wa.me/573206160708?text=Me%20comunico%20porque%20estoy%20interesado%20en%20la%20Escuela%20Sindical%20Maria%20Cano">
                            <span class="mobi-mbri mobi-mbri-chat mbr-iconfont mbr-iconfont-btn"></span>Consulta en Whatsapp
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    </section>

    <section class="header1 cid-s1YTm1ANEj" id="header1-u">


        <div class="container align-center">
            <div class="row justify-content-center">
                <div class="mbr-white col-md-12 col-lg-12">


                    <p class="mbr-text pb-4 mbr-white mbr-regular mbr-fonts-style display-5">
                        <a href="/info/musica/index.html">Cultura y música proletaria</a> / <span class="text-white nombre"><? echo $row["nombre"]?></span><br>
                    </p>

                </div>
            </div>
        </div>
    </section>

    <section class="content1 cid-s1YTR0mvfd">

        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-12 col-md-12 md-pb">
                    <div class="card text-white bg-dark">
                        <div class="card-img-top embed-container">
                        <iframe src="https://www.youtube.com/embed/<? echo $youtube_video?>" frameborder = "0"> </iframe>
                        </div>
                        <div class="card-body d-flex flex-row">
                            <div>
                                <h5 class="card-title font-weight-bold mb-2 nombre"><? echo $row["nombre"]?></h5>
                                <p class="card-text"><span id="nacionalidad"><? echo $row["nacionalidad"]?></span</p>
                            </div>
                        </div>
                        <div class="card-body" id="descripcion">
                        <? echo $row["descripcion"]?>

                        </div>
                        <p class="card-body">Página Web Oficial: <span id="pagina_web"><? echo $row["pagina_web"]?></span</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </section>


    <section class="footer1 cid-s1YVeG8ECw" once="footers" id="footer1-1t">


        <div class="container">
            <div class="row mbr-white justify-content-center">
                <div class="col-12 col-lg-6 col-md-6">
                    <p class="mbr-text1 align-left mbr-fonts-style align-left display-7">Por un Sindicalismo
                        Independiente y de Nuevo Tipo</p>
                </div>
                <div class="col-12 col-lg-6 col-md-6">
                    <p class="mbr-text2 align-right mbr-fonts-style align-left display-7">© 2021 by <a href="/"" class="
                            text-secondary">Escuela Sindical María Cano</a></p>
                </div>
            </div>
        </div>
    </section>


    <script src="/assets/web/assets/jquery/jquery.min.js"></script>
    <script src="/assets/popper/popper.min.js"></script>
    <script src="/assets/tether/tether.min.js"></script>
    <script src="/assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="/assets/smoothscroll/smooth-scroll.js"></script>
    <script src="/assets/dropdown/js/nav-dropdown.js"></script>
    <script src="/assets/dropdown/js/navbar-dropdown.js"></script>
    <script src="/assets/touchswipe/jquery.touch-swipe.min.js"></script>
    <script src="/assets/as-pie-progress/jquery-as-pie-progress.min.js"></script>
    <script src="/assets/playervimeo/vimeo_player.js"></script>
    <script src="/assets/formstyler/jquery.formstyler.js"></script>
    <script src="/assets/formstyler/jquery.formstyler.min.js"></script>
    <script src="/assets/datepicker/jquery.datetimepicker.full.js"></script>
    <script src="/assets/theme/js/script.js"></script>
    <script src="/assets/formoid/formoid.min.js"></script>
    <script src="/assets/mdb/js/mdb.min.js"></script>
    <script src="/js/script.js"></script>
</body>

</html>