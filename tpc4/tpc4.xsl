<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="tabsite/index.html">
            <html>
                <head>
                    <title>
                        Arqueossitios NW
                    </title>
                </head>
                <body>
                    <a name="indice"></a>
                    <h3>
                        Arqueossitios NW
                    </h3>
                    <ul>
                        <xsl:apply-templates select="//ARQELEM[not(CONCEL=preceding::CONCEL)]">
                            <xsl:sort select="CONCEL"/>
                        </xsl:apply-templates>
                    </ul>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates select="//ARQELEM" mode="individual">
            
        </xsl:apply-templates>
    </xsl:template>
    
    <!-- Templates para o indice -->
    
    <xsl:template match="ARQELEM">
        <xsl:variable name="c" select="CONCEL"/>
        <li>
            <xsl:value-of select="CONCEL"/>
            <ul>
                <xsl:apply-templates select="//ARQELEM[CONCEL=$c]" mode="subindice">
                    <xsl:sort select="normalize-space(IDENTI)"/>
                </xsl:apply-templates>
            </ul>
        </li>
    </xsl:template>
    
    <!-- Templates para o subindice -->
    
    <xsl:template match="ARQELEM" mode="subindice">
        <li>
            <a href="{generate-id()}.html">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>

    
    <xsl:template match="ARQELEM" mode="individual">
        <xsl:result-document href="tabsite/{generate-id()}.html">
            <html>
                <head>
                    <title>
                        <xsl:value-of select="IDENTI"/>
                    </title>
                </head>
                <body>
                    <dl>
                        <xsl:for-each select="./*">
                            <dt>
                                <xsl:value-of select="name(.)"/>
                            </dt>
                            <dd>
                                <xsl:value-of select="."/>
                            </dd>
                        </xsl:for-each>
                    </dl>
                    <address>
                        [
                            <a href="index.html">
                                Voltar ao Indice
                            </a>
                        ]
                    </address>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
    
</xsl:stylesheet>