package com.iservport

import org.springframework.security.core.Authentication

/**
  * Mix-in to implicitly extract entity or identity from the principal.
  */
trait AuthorityExtractor {

  def _contextId(implicit principal: Authentication) = id(principal, "ROLE_CONTEXT_")

  def _entityId(implicit principal: Authentication) = id(principal, "ROLE_ENTITY_ID_")

  def _userId(implicit principal: Authentication) = id(principal, "ROLE_USER_ID_")

  def _identityId(implicit principal: Authentication) = id(principal, "ROLE_SELF_ID_")

  def _authoritySet(implicit principal: Authentication) = {
    import collection.JavaConversions._
    principal
      .getAuthorities
      .map(_.toString)
  }

  private def id(principal: Authentication, prefix: String) =
    Option(principal) match {
      case Some(p) =>
        import collection.JavaConversions._
        p.getAuthorities
        .filter(_.toString.startsWith(prefix))
        .map(_.toString.substring(prefix.length))
        .headOption.getOrElse("0").toInt
      case None => 0
    }

}
