organization := "com.iservport"

name := "iservport-bootstrap-skin"

version := "1.1.0.RELEASE"

scalaVersion := "2.12.1"

val angularVersion = "1.6.3"

val springBootVersion = "1.4.0.RELEASE"

libraryDependencies ++= Seq(
  "org.springframework.boot"                   % "spring-boot-starter-web"        % springBootVersion,
  "org.springframework.boot"                   % "spring-boot-starter-security"   % springBootVersion,

  "org.webjars"       % "webjars-locator"      % "0.32-1",
  "org.webjars.bower" % "angular"              % angularVersion,
  "org.webjars.bower" % "angular-sanitize"     % angularVersion,
  "org.webjars.bower" % "angular-resource"     % angularVersion,
  "org.webjars.bower" % "angular-animate"      % angularVersion,
  "org.webjars.bower" % "angular-i18n"         % angularVersion,
  "org.webjars.bower" % "angular-loading-bar"  % "0.9.0",
  "org.webjars.bower" % "slimScroll"           % "1.3.3"  exclude("org.webjars.bower", "jquery"),
  "org.webjars.bower" % "bootstrap"            % "3.3.7"  exclude("org.webjars.bower", "jquery"),
  "org.webjars.bower" % "jquery"               % "2.2.4",
  "org.webjars.bower" % "fontawesome"          % "4.6.3"  exclude("org.webjars", "bootstrap"),
  "org.webjars.bower" % "angular-ui-bootstrap-bower" % "2.5.0",
  "org.webjars.bower" % "angular-ui-mask"      % "1.8.7",
  "org.webjars.bower" % "bootstrap-social"     % "5.0.0",
  "org.webjars.bower" % "angular-bootstrap-calendar" % "0.20.2" exclude("org.webjars", "angular"),
  "org.webjars.bower" % "angular-ui-ace"       % "0.2.3",
  "org.webjars.bower" % "angular-ui-select"    % "0.19.6",
  "org.webjars.bower" % "github-com-nervgh-angular-file-upload" % "v2.3.4",
  "org.webjars.bower" % "angular-chart.js"     % "0.10.2" exclude("org.webjars", "angular"),
  "org.webjars.bower" % "momentjs"             % "2.10.3",
  "org.webjars.bower" % "ng-file-upload"       % "10.1.8" exclude("org.webjars", "angular"),
  "org.webjars.bower" % "ngImgCrop"            % "0.3.2",
  "org.webjars.bower" % "material-design-iconic-font" % "2.2.0",

  "org.webjars" % "chosen"   % "0.9.12",
  "org.webjars" % "dropzone" % "3.7.1",
  "org.webjars" % "fullcalendar"               % "1.6.4"  exclude("org.webjars", "jquery"),
  "org.webjars" % "jquery-validation"          % "1.13.0" exclude("org.webjars", "jquery"),
  "org.webjars" % "jquery-knob"                % "1.2.2"  exclude("org.webjars", "jquery"),
  "org.webjars" % "jquery-cookie"              % "1.4.0"  exclude("org.webjars", "jquery"),
  "org.webjars" % "jquery.inputmask"           % "3.1.0"  exclude("org.webjars", "jquery"),
  "org.webjars" % "json3"    % "3.3.2-1",

  "org.webjars" % "ionicons" % "1.5.2",
  "org.webjars" % "foundation-icon-fonts" % "d596a3cfb3",
  "org.webjars" % "material-design-icons" % "2.2.0",
  "org.webjars" % "chartjs" % "1.0.2" exclude("org.webjars", "angular")


)

resolvers  ++= Seq(
  "Helianto Releases"  at "s3://maven.helianto.org/release",
  "Helianto Snapshots" at "s3://maven.helianto.org/snapshot",
  "Helianto Development" at "s3://maven.helianto.org/devel"
)

publishTo := {
  val helianto = "s3://maven.helianto.org/"
  if (version.value.trim.endsWith("SNAPSHOT"))
    Some("Helianto Snapshots" at helianto + "snapshot")
  else if (version.value.trim.endsWith("RELEASE"))
    Some("Helianto Releases" at helianto + "release")
  else
    Some("Helianto Development"  at helianto + "devel")
}

credentials += Credentials(Path.userHome / ".sbt" / ".s3credentials")

publishMavenStyle := true
