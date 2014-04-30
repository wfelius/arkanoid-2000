<?php define('ENVIRONMENT', 'dev'); ?>

<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->

<head>

    <meta charset='utf-8'>
    <meta name="robots" content="noindex,nofollow">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1 user-scalable=no">

    <title>Arkanoid 2000</title>
     
    <link rel="stylesheet" href="css/style.max.css">
    <script src="js/libs/modernizr.custom.25127.js"></script>

</head>
<body>
    
    <div id="container">
        <header id="header-main">
            <div class="background"></div>
            <h1>Arkanoid 2000</h1>
            <span id="lives">lives <span id="lives-num">0</span></span>
        </header>

        <div id="content-main" class="clearfix">
           <div id="grid"></div>
           <div id="panel"></div>
           <div id="pad"></div>
        </div>

        <footer id="footer-main">
            <div class="background"></div>
            <span>Created by Wouter Felius &copy; <?= date('Y'); ?></span>
        </footer>
    </div>



    <?php if(ENVIRONMENT != 'production') { ?>
        <!-- libs -->
        <script src="js/libs/jquery-1.11.0.min.js"></script>
        <script src="js/libs/underscore-min.js"></script>
        <script src="js/libs/backbone-min.js"></script>
        <script src="js/libs/handlebars-v1.3.0.min.js"></script>
        <!-- backbone -->
        <script src="js/models/UserData.js"></script>
        <script src="js/models/GridItem.js"></script>
        <script src="js/models/LevelBlock.js"></script>
        <script src="js/models/PanelModel.js"></script>
        <script src="js/models/PadModel.js"></script>
        <script src="js/models/BallModel.js"></script>
        <script src="js/collections/GridItems.js"></script>
        <script src="js/collections/PanelCollection.js"></script>
        <script src="js/collections/LevelBlocks.js"></script>
        <script src="js/views/GridItemView.js"></script>
        <script src="js/views/GridView.js"></script>
        <script src="js/views/LevelBlockView.js"></script>
        <script src="js/views/LevelView.js"></script>
        <script src="js/views/PanelView.js"></script>
        <script src="js/views/PadView.js"></script>
        <script src="js/views/BallView.js"></script>
        <script src="js/app.js"></script>
    <?php } else { ?>
        <script src="js/main.min.js"></script>
    <?php } ?>
   
</body>
</html>

