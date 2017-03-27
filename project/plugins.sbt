logLevel := Level.Warn

dependencyOverrides += "org.scala-sbt" % "sbt" % "0.13.9"

addSbtPlugin("net.virtual-void" % "sbt-dependency-graph" % "0.8.2")

addSbtPlugin("com.earldouglas" % "xsbt-web-plugin" % "2.1.0")

addSbtPlugin("com.typesafe.sbt" % "sbt-native-packager" % "1.1.4")

addSbtPlugin("io.spray" % "sbt-revolver" % "0.8.0")

addSbtPlugin("com.frugalmechanic" % "fm-sbt-s3-resolver" % "0.9.0")

